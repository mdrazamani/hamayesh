import Discount from "../app/models/billing/discount.model.mjs";
import PricingRule from "../app/models/billing/pricingRule.model.mjs";
import HamayeshDetail from "../app/models/hamayeshDetail.model.mjs";
import {
    get as getUser,
    update as updateUser,
} from "../app/services/user.service.mjs";

import { update as updateDiscount } from "../app/services/billing/discount.service.mjs";
import APIError from "./errors.mjs";
import { getMessage } from "../config/i18nConfig.mjs";
import { validateNumber } from "./NumberTools.mjs";

const taxCalculator = async (total) => {
    const hamayeshDetails = await HamayeshDetail.findOne();
    const taxPercent = hamayeshDetails?.tax || 0;
    return (total * taxPercent) / 100;
};

const isGlobalDiscount = async () => {
    const discounts = await Discount.find({
        type: { $in: ["", null] },
        rules: { $size: 0 },
        users: { $size: 0 },
    });
    return discounts.length > 0 ? discounts : false;
};

const isItemDiscount = async (itemId) => {
    const discounts = await Discount.find({ rules: itemId });
    return discounts.length > 0 ? discounts : false;
};

const isTypeDiscount = async (items) => {
    const uniqueTypes = [...new Set(items.map((item) => item.itemType))];
    const discounts = await Discount.find({ type: { $in: uniqueTypes } });

    return discounts.length > 0 ? discounts : false;
};

const itemsPriceCalculator = async (items) => {
    let allDiscounts = 0;
    let totalPrice = 0;
    let totalNumber = 0;
    let undefinedArticles = false;

    for (const item of items) {
        if (!item.item) continue;

        const itemData = await PricingRule.findOne({ _id: item.item });
        if (!itemData) continue; // Skip if itemData not found

        const { price = 0, number = 0, additionalInfo = {} } = itemData;
        const inputNumber = validateNumber(Number(item.number));

        if (isNaN(inputNumber)) {
            throw new APIError({
                message: getMessage("invalid_item_number"),
                status: 400,
            });
        }

        let itemPrice = price;
        let itemNumber = number;

        if (additionalInfo.number === true && additionalInfo.price) {
            itemPrice += additionalInfo.price * inputNumber;
            itemNumber += inputNumber;
        }

        const discounts = await isItemDiscount(item.item);
        if (discounts) {
            const discountP = await discountsCalculator(discounts, itemPrice);
            itemPrice -= validateNumber(discountP);
            allDiscounts += validateNumber(discountP);
        }

        totalPrice += validateNumber(itemPrice);
        totalNumber += validateNumber(itemNumber);

        if (itemPrice === 0 || itemNumber === 0) {
            undefinedArticles = true;
        }
    }

    return undefinedArticles
        ? [totalPrice, "infinity", allDiscounts]
        : [totalPrice, totalNumber, allDiscounts];
};

export const discountsCalculator = async (discounts, total) => {
    let discountAmount = 0;
    let discountPercents = 0;

    for (const discount of discounts) {
        if (discount?.useNumber === 0) {
            await updateDiscount(discount._id, { activity: false });
            break;
        } else if (discount?.useNumber && discount.useNumber > 0) {
            await updateDiscount(discount._id, {
                useNumber: discount.useNumber - 1,
            });
        }

        if (discount?.amount) {
            discountAmount += discount.amount;
        } else if (discount?.percent) {
            discountPercents += discount.percent;
        }
    }

    const percentDiscount = (total * discountPercents) / 100;
    return discountAmount + percentDiscount;
};

const checkItems = (data) => {
    if (!data?.items || !Array.isArray(data.items)) {
        throw new Error("Invalid data format: items must be an array.");
    }

    const counts = data.items.reduce((acc, item) => {
        if (
            item.itemType === "article" ||
            item.itemType === "freeRegistration"
        ) {
            acc[item.itemType] = (acc[item.itemType] || 0) + 1;
        }
        return acc;
    }, {});

    if (counts.article > 1 || counts.freeRegistration > 1) {
        throw new Error(
            "فقط یک پلن از article و یا freeRegistration می‌توان انتخاب کرد"
        );
    }
};

export const invoiceCalculator = async (data) => {
    try {
        checkItems(data);

        const [subTotal, totalNumber, allDiscounts] =
            await itemsPriceCalculator(data?.items);

        if (subTotal === "undefined") {
            throw new APIError({
                message: getMessage(
                    "Cannot calculate invoice due to undefined items"
                ),
                status: 400,
            });
        }

        let total = subTotal;
        const tax = await taxCalculator(total);
        total += validateNumber(tax);

        // Global discount
        let discountGlobal = 0;
        const globalDiscount = await isGlobalDiscount();
        if (globalDiscount.length) {
            discountGlobal = await discountsCalculator(globalDiscount, total);
            total -= validateNumber(discountGlobal);
        }

        // Type discounts
        let discountType = 0;
        const typeDiscount = await isTypeDiscount(data?.items);
        if (typeDiscount.length) {
            discountType = await discountsCalculator(typeDiscount, total);
            total -= validateNumber(discountType);
        }

        return {
            subTotalPrice: validateNumber(subTotal),
            total: Math.floor(validateNumber(total)),
            allDiscounts: validateNumber(allDiscounts),
            discountType: validateNumber(discountType),
            discountGlobal: validateNumber(discountGlobal),
            tax: validateNumber(tax),
            articleNumber: totalNumber,
        };
    } catch (error) {
        throw new APIError({
            message: getMessage(error.message),
            status: 400,
        });
    }
};

export const updateBillingUser = async (invoiceId, userId, articleNumber) => {
    if (userId?._id) userId = userId._id;
    try {
        const user = await getUser(userId);

        if (!user) {
            throw new APIError({
                message: getMessage("User_or_billing_status_not_found"),
                status: 401,
            });
        }

        let updatedArticles;
        if (articleNumber) {
            updatedArticles =
                articleNumber === "Infinity"
                    ? "Infinity"
                    : (user.billingStatus.articles || 0) + articleNumber;
        }
        const updatedInvoices = [
            ...new Set([...(user.billingStatus.invoices || []), invoiceId]),
        ];

        const updateResult = await updateUser(userId, {
            billingStatus: {
                articles: updatedArticles,
                invoices: updatedInvoices,
            },
        });

        return updateResult;
    } catch (error) {
        throw new APIError({
            message: getMessage("Error updating billing user"),
            status: 401,
        });
    }
};
