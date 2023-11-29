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

const taxCalculator = async (total) => {
    const taxPercent = await HamayeshDetail.findOne();
    return (total * taxPercent?.tax) / 100;
};

const isGlobalDiscount = async () => {
    const discounts = await Discount.find({
        type: { $in: ["", null] },
        rules: { $size: 0 },
        users: { $size: 0 },
    });
    if (discounts) return discounts;
    return false;
};

const isItemDiscount = async (itemId) => {
    const discounts = await Discount.find({ rules: itemId });
    if (discounts) return discounts;
    return false;
};

const isTypeDiscount = async (items) => {
    let uniqueTypes = new Set();

    for (const item of items) {
        if (item.itemType && !uniqueTypes.has(item.itemType)) {
            uniqueTypes.add(item.itemType);
        }
    }

    let discounts = [];
    for (const type of uniqueTypes) {
        const discount = await Discount.find({ type });
        discounts.push(...discount);
    }
    if (discounts.length > 0) {
        return discounts;
    }
    return false;
};

// const codesDiscount = async (codes) => {
//     let discounts = [];
//     for (const code of codes) {
//         const discount = await Discount.find({ code });
//         discounts.push(...discount);
//     }
//     if (discounts.length > 0) {
//         return discounts;
//     }
//     return false;
// };

const itemsPriceCalculator = async (items) => {
    let allDiscounts = 0;
    let totalPrice = 0;
    let totalNumber = 0;
    let undefinedArticles = false;

    for (const item of items) {
        if (item.item) {
            const itemData = await PricingRule.findOne({ _id: item.item });
            const { price = 0, number = 0, additionalInfo = {} } = itemData;
            let inputNumber = Number(item.number);
            if (inputNumber && isNaN(inputNumber)) {
                throw new APIError({
                    message: getMessage("your_number_is_not_valid"),
                    status: 404,
                });
            }
            let itemPrice = price;
            let itemNumber = number;
            if (additionalInfo.number === true && additionalInfo.price) {
                itemPrice += additionalInfo.price * inputNumber;
                itemNumber += inputNumber;
            }

            const discounts = isItemDiscount(item.item);
            if (discounts.length) {
                const discountP = discountsCalculator(discounts, itemPrice);
                itemPrice -= discountP;
                allDiscounts += discountP;
            }

            totalPrice += itemPrice;
            totalNumber += itemNumber;

            if (itemPrice === 0 || itemNumber === 0) {
                undefinedArticles = true;
            }
        }
    }

    const result = undefinedArticles
        ? [totalPrice, "infinity", allDiscounts]
        : [totalPrice, totalNumber, allDiscounts];

    return result;
};

export const discountsCalculator = async (discounts, total) => {
    let discountAmount = 0;
    let discountPercents = 0;
    if (discounts.length) {
        for (const item of discounts) {
            if (item?.useNumber && item?.useNumber >= 0) {
                const useNumber = item?.useNumber - 1;
                const upDiscount = await updateDiscount(item?._id, {
                    useNumber,
                });
            } else if (item?.useNumber == 0) {
                const upDiscount = await updateDiscount(item?._id, {
                    activity: false,
                });
                break;
            }

            if (item?.amount) {
                // const discount = Discount.findOne({ _id: item });
                discountAmount += item.amount;
            } else if (item?.percent) {
                discountPercents += item.percent;
            }
        }
    }

    const percentDiscount = (total * discountPercents) / 100;
    return discountAmount + percentDiscount;
};

const checkItems = (data) => {
    let articleCount = 0;
    let freeRegisterCount = 0;

    if (data?.items && Array.isArray(data.items)) {
        for (const item of data.items) {
            if (item.itemType === "article") {
                articleCount++;
            }
            if (item.itemType === "freeRegistration") {
                freeRegisterCount++;
            }
        }

        if (articleCount > 1 || freeRegisterCount > 1) {
            throw new Error(
                "فقط یک پلن از article و یا freeRegistration می‌توان انتخاب کرد"
            );
        }
    }
};

export const invoiceCalculator = async (data) => {
    try {
        checkItems(data);

        // allDiscounts is items all discounts

        // let test = itemsPriceCalculator(data?.items);

        let [subTotal, totalNumber, allDiscounts] = await itemsPriceCalculator(
            data?.items
        );

        if (subTotal === "undefined")
            return "Cannot calculate invoice due to undefined items";

        const mainSubTotal = subTotal;

        const tax = await taxCalculator(subTotal);
        subTotal += tax;

        // is global discount
        let discountGlobal = 0;
        const globalDiscount = await isGlobalDiscount(data?.items);
        if (globalDiscount.length) {
            discountGlobal = await discountsCalculator(
                globalDiscount,
                subTotal
            );
            subTotal -= discountGlobal;
        }

        // type discounts
        let discounttype = 0;
        const typeDiscount = await isTypeDiscount(data?.items);
        if (typeDiscount.length) {
            discounttype = await discountsCalculator(typeDiscount, subTotal);
            subTotal -= discounttype;
        }

        // code discounts
        // let discountcodes = 0;
        // if (data?.codes) {
        //     const codesDiscountP = codesDiscount(data?.codes);
        //     if (codesDiscountP) {
        //         discountcodes = discountsCalculator(codesDiscountP, subTotal);
        //         subTotal -= discountcodes;
        //     }
        // }

        return {
            subTotalPrice: mainSubTotal,
            total: subTotal,
            allDiscounts,
            discounttype,
            discountGlobal,
            tax,
            articleNumber: totalNumber,
        };
    } catch (error) {
        console.error(error.message);
    }
};

// هر وقت فاکتور پرداخت شد
export const updateBillingUser = (invoiceId, userId, articleNumber) => {
    const user = getUser(userId);

    if (!user || !user.billingStatus) {
        console.error("User or billing status not found");
        return;
    }

    const updatedArticles = (user.billingStatus.articles || 0) + articleNumber;
    const updatedInvoices = user.billingStatus.invoices
        ? [...user.billingStatus.invoices, invoiceId]
        : [invoiceId];

    const billing = {
        billingStatus: {
            articles: updatedArticles,
            invoices: updatedInvoices,
        },
    };

    const update = updateUser(userId, billing);
    if (update) return true;
    return false;
};
