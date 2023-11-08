import { getMessage } from "../../config/i18nConfig.mjs";
import crudFactory from "../../utils/crudFactory.mjs";
import APIError from "../../utils/errors.mjs";
import Article from "../models/article.model.mjs";

const populateOptions = [
    {
        path: "category",
        model: "ArticleCategory",
        select: "-__v",
    },
    {
        path: "userId",
        model: "User",
        select: "-__v",
    },
];

export const create = async (data) => {
    return await crudFactory.create(Article)(data);
};

export const update = async (id, data, user) => {
    if (user.role.name == "user")
        return await crudFactory.update(Article)(id, data);
    else {
        if (hamayesh.dates.refeeResult < Date.now()) {
            throw new APIError({
                message: getMessage("errors.refeeResult"),
                status: constants.BAD_REQUEST,
            });
        }
        return await Article.updateOne({ _id: id }, { $set: data });
    }
};

export const get = async (id) => {
    return await crudFactory.get(Article)(id, {
        populate: populateOptions,
    });
};

export const getAll = async (options) => {
    return await crudFactory.getAll(Article)({
        ...options,
        populate: populateOptions,
    });
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Article)(id);
};
