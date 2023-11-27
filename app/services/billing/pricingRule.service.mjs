import crudFactory from "../../../utils/crudFactory.mjs";
import PricingRule from "../../models/billing/pricingRule.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(PricingRule)(data);
};

export const update = async (id, data) => {
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
