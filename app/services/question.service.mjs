// userService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import Question from "../models/question.model.mjs";

const { addNested, updateNested, deleteNested } = crudFactory;

export const addNestedItem = (mainDocId, itemData) =>
    addNested(Question)(mainDocId, "items", itemData);
export const updateNestedItem = (mainDocId, itemId, itemData) =>
    updateNested(Question)(mainDocId, "items", itemId, itemData);
export const deleteNestedItem = (mainDocId, itemId) =>
    deleteNested(Question)(mainDocId, "items", itemId);

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
