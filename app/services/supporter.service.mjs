// userService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import Supporter from "../models/supporter.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(Supporter)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Supporter)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Supporter)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(Supporter)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Supporter)(id);
};
