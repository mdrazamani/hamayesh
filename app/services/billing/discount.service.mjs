import crudFactory from "../../../utils/crudFactory.mjs";
import Discount from "../../models/billing/discount.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(Discount)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Discount)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Discount)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(Discount)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Discount)(id);
};
