// userService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import Question from "../models/question.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(Question)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Question)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Question)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(Question)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Question)(id);
};
