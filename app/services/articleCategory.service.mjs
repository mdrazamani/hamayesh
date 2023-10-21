import crudFactory from "../../utils/crudFactory.mjs";
import ArticleCategory from "../models/articleCategory.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(ArticleCategory)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(ArticleCategory)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(ArticleCategory)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(ArticleCategory)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(ArticleCategory)(id);
};
