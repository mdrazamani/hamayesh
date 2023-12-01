import crudFactory from "../../../utils/crudFactory.mjs";
import Getway from "../../models/billing/gateway.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(Getway)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Getway)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Getway)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(Getway)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Getway)(id);
};
