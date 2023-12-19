import { getMessage } from "../../../config/i18nConfig.mjs";
import crudFactory from "../../../utils/crudFactory.mjs";
import APIError from "../../../utils/errors.mjs";
import {
    discountsCalculator,
    invoiceCalculator,
} from "../../../utils/invoiceCalculator.mjs";
import { validateNumber } from "../../../utils/NumberTools.mjs";
import Invoice from "../../models/billing/invoice.model.mjs";
import { applyDiscount } from "./discount.service.mjs";

const populateOptions = [
    {
        path: "user",
        select: `fa.firstName fa.lastName en.firstName en.lastName id profileImage state city`,
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

    {
        path: "organizer",
        model: "Organizer",
        select: `fa.name en.name logo details`,
        populate: [
            {
                path: "details.address.state",
                model: "State",
            },
            {
                path: "details.address.city",
                model: "City",
            },
        ],
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

    data.subtotal = validateNumber(subTotalPrice);
    data.total = validateNumber(total);
    data.discountPrice =
        validateNumber(allDiscounts) +
        validateNumber(discounttype) +
        validateNumber(discountGlobal);
    data.taxPrice = validateNumber(tax);
    data.articleNumber = articleNumber;

    return await crudFactory.create(Invoice)(data);
};

export const update = async (id, data) => {
    const {
        subTotalPrice,
        total,
        allDiscounts,
        discounttype,
        discountGlobal,
        tax,
        articleNumber,
    } = await invoiceCalculator(data);

    data.subtotal = validateNumber(subTotalPrice);
    data.total = validateNumber(total);
    data.discountPrice =
        validateNumber(allDiscounts) +
        validateNumber(discounttype) +
        validateNumber(discountGlobal);
    data.taxPrice = validateNumber(tax);
    data.articleNumber = articleNumber;

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

    if (!codes.length) {
        throw new APIError({
            message: getMessage("no_discount_codes_provided"),
            status: 400,
        });
    }

    const invoice = await get(invoiceId);
    if (!invoice) {
        throw new APIError({
            message: getMessage("invoice_not_found"),
            status: 404,
        });
    }

    const { uniqueItemTypes, itemList } = getInvoiceItems(invoice.items);

    // Combine discount checks into a single call to reduce async overhead
    const combinedDiscounts = await Promise.all([
        applyDiscount(codes, userId),
        applyDiscount(codes, userId, uniqueItemTypes),
        applyDiscount(codes, userId, [], itemList),
    ]);

    // Flatten the array of discounts
    const discounts = combinedDiscounts.flat();

    if (!discounts.length) {
        throw new APIError({
            message: getMessage("discount_code_not_applicable"),
            status: 404,
        });
    }

    const discountAmount = await discountsCalculator(discounts, invoice.total);
    if (!discountAmount) {
        throw new APIError({
            message: getMessage("discount_calculation_failed"),
            status: 400,
        });
    }

    return update(invoiceId, {
        total: invoice.total - validateNumber(discountAmount),
        discountPrice:
            (invoice.discountPrice || 0) + validateNumber(discountAmount),
    });
};
