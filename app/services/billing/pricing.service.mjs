import crudFactory from "../../../utils/crudFactory.mjs";
import Pricing from "../../models/billing/pricing.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(Pricing)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Pricing)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Pricing)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(Pricing)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Pricing)(id);
};
