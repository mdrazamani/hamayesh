import crudFactory from "../../../utils/crudFactory.mjs";
import Invoice from "../../models/billing/invoice.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(Invoice)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Invoice)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Invoice)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(Invoice)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Invoice)(id);
};
