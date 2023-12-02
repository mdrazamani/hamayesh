import { getMessage } from "../../../config/i18nConfig.mjs";
import crudFactory from "../../../utils/crudFactory.mjs";
import APIError from "../../../utils/errors.mjs";
import PricingRule from "../../models/billing/pricingRule.model.mjs";

export const create = async (data) => {
    if (data?.number) {
        data.number = Number(data?.number);
        if (data?.number && isNaN(data?.number)) {
            throw new APIError({
                message: getMessage("your_number_is_not_valid"),
                status: 404,
            });
        }
    }

    if (data?.price) {
        data.price = Number(data?.price);
        if (data?.price && isNaN(data?.price)) {
            throw new APIError({
                message: getMessage("your_number_is_not_valid"),
                status: 404,
            });
        }
    }
    return await crudFactory.create(PricingRule)(data);
};

export const update = async (id, data) => {
    if (data?.number) {
        data.number = Number(data?.number);
        if (data?.number && isNaN(data?.number)) {
            throw new APIError({
                message: getMessage("your_number_is_not_valid"),
                status: 404,
            });
        }
    }

    if (data?.price) {
        data.price = Number(data?.price);
        if (data?.price && isNaN(data?.price)) {
            throw new APIError({
                message: getMessage("your_number_is_not_valid"),
                status: 404,
            });
        }
    }

    return await crudFactory.update(PricingRule)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(PricingRule)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(PricingRule)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(PricingRule)(id);
};
