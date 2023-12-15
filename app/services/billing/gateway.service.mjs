import crudFactory from "../../../utils/crudFactory.mjs";
import Gateway from "../../models/billing/gateway.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(Gateway)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Gateway)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Gateway)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(Gateway)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Gateway)(id);
};
