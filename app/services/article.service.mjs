import { getMessage } from "../../config/i18nConfig.mjs";
import crudFactory from "../../utils/crudFactory.mjs";
import APIError from "../../utils/errors.mjs";
import Article from "../models/article.model.mjs";
import ArticleCategory from "../models/articleCategory.model.mjs";
import HamayeshDetail from "../models/hamayeshDetail.model.mjs";

const populateOptions = [
    {
        path: "category",
        model: "ArticleCategory",
        select: "-__v",
    },
    {
        path: "userId",
        model: "User",
        select: "-__v -password", // Assuming you want to exclude the password field
    },
    {
        path: "arbitrations.refereeId",
        model: "User",
        select: "-__v -password", // Exclude sensitive fields
    },
    {
        path: "arbitrations.messages.user",
        model: "User",
        select: "-__v -password", // Exclude sensitive fields for message user
    },
    // If there are any other reference fields, add them here similarly
];
export const create = async (data) => {
    return await crudFactory.create(Article)(data);
};

export const update = async (id, data, user) => {
    if (user.role.name === "admin" || user.role.name === "referee")
        return await crudFactory.update(Article)(id, data);
    else if (user.role.name === "user") {
        const hamayesh = await HamayeshDetail.findOne();

        if (hamayesh.dates.editArticle < Date.now()) {
            throw new APIError({
                message: getMessage("errors.editArticle"),
                status: constants.BAD_REQUEST,
            });
        }
        return await Article.updateOne({ _id: id }, { $set: data });
    } else {
        throw new APIError({
            message: getMessage("errors.editArticle"),
            status: constants.BAD_REQUEST,
        });
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

const categoryIdMaker = (categories) => {
    return categories.map((cat) => cat._id).join(" || ");
};

export const getAllReferee = async (options, refereeId) => {
    const categories = await ArticleCategory.find({ referees: refereeId });

    return await crudFactory.getAll(Article)({
        ...options,
        ...{ category: categoryIdMaker(categories) },
        populate: populateOptions,
    });

    // let articles = [];
    // categories.forEach((cat) => {
    //     const article = Article.find({ category: cat });
    //     articles.push(article);
    // });
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Article)(id);
};

export const getAllUniqueUserIds = async () => {
    return await Article.aggregate([
        {
            $group: {
                _id: "$userId",
            },
        },
        {
            $project: {
                _id: 0,
                userId: "$_id",
            },
        },
    ]);
};

export const getAllArticlesByUserId = async (userId) => {
    return await Article.find({ userId: userId });
};
