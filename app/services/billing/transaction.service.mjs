import crudFactory from "../../../utils/crudFactory.mjs";
import Transaction from "../../models/billing/transaction.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(Transaction)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Transaction)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Transaction)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(Transaction)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Transaction)(id);
};
