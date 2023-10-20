// userService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import NewsTag from "../models/newsTag.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(NewsTag)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(NewsTag)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(NewsTag)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(NewsTag)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(NewsTag)(id);
};
