// userService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import NewsComment from "../models/newsComment.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(NewsComment)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(NewsComment)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(NewsComment)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(NewsComment)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(NewsComment)(id);
};
