import { getMessage } from "../../../config/i18nConfig.mjs";
import crudFactory from "../../../utils/crudFactory.mjs";
import APIError from "../../../utils/errors.mjs";
import {
    discountsCalculator,
    invoiceCalculator,
} from "../../../utils/invoiceCalculator.mjs";
import Invoice from "../../models/billing/invoice.model.mjs";
import { applyDiscount } from "./discount.service.mjs";

const populateOptions = [
    {
        path: "user",
        select: `fa.firstName fa.lastName en.firstName en.lastName id profileImage -state -city`,
    },
    {
        path: "items.item",
        model: "pricingRule",
        select: `-__v`,
    },
    {
        path: "discounts",
        model: "discount",
        select: `_id amount percent type code expiresAt`,
    },
]; //-__v

export const create = async (data) => {
    const {
        subTotalPrice,
        total,
        allDiscounts,
        discounttype,
        discountGlobal,
        tax,
        articleNumber,
    } = await invoiceCalculator(data);

    data.subtotal = subTotalPrice;
    data.total = total;
    data.discountPrice = allDiscounts + discounttype + discountGlobal;
    data.taxPrice = tax;
    data.articleNumber = articleNumber;

    const added = await crudFactory.create(Invoice)(data);
    // هر وقت پرداخت موفق بود این اتفاق رخ بده
    // const resultUser = updateBillingUser(
    //     added?._id,
    //     data?.userId,
    //     articleNumber
    // );

    return added;
};

export const update = async (id, data) => {
    return await crudFactory.update(Invoice)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Invoice)(id, { populate: populateOptions });
};

export const getAll = async (options) => {
    const modifiedOptions = {
        ...options,
        populate: populateOptions, // add populate here
    };
    return await crudFactory.getAll(Invoice)(modifiedOptions);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Invoice)(id);
};

const getInvoiceItems = (items) => {
    const uniqueItemTypes = new Set();
    const itemList = [];

    for (const item of items) {
        uniqueItemTypes.add(item.itemType);
        itemList.push(item.item);
    }

    return {
        uniqueItemTypes: Array.from(uniqueItemTypes),
        itemList,
    };
};

export const updateDiscount = async (data) => {
    const { codes, invoiceId, userId } = data;
    const invoice = await get(invoiceId);
    let discountP = 0;
    if (!invoice && !invoice?._id) {
        throw new APIError({
            message: getMessage("your_invoice_not_found"),
            status: 404,
        });
    }

    const { uniqueItemTypes, itemList } = getInvoiceItems(invoice?.items);

    const discounts_main = await applyDiscount(codes, userId);
    const discounts_type = await applyDiscount(codes, userId, uniqueItemTypes);
    const discounts_rule = await applyDiscount(codes, userId, [], itemList);

    const discounts = [...discounts_main, ...discounts_type, ...discounts_rule];

    if (discounts.length) {
        discountP += await discountsCalculator(discounts, invoice?.total);
    }
    return update(invoiceId, {
        total: invoice?.total - discountP,
        discountPrice: invoice?.discountPrice + discountP,
    });
};
