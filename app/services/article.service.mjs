import { getMessage } from "../../config/i18nConfig.mjs";
import crudFactory from "../../utils/crudFactory.mjs";
import APIError from "../../utils/errors.mjs";
import Article from "../models/article.model.mjs";
import HamayeshDetail from "../models/hamayeshDetail.model.mjs";
import { update as updateUser } from "./user.service.mjs";

const populateOptions = [
    {
        path: "category",
        model: "ArticleCategory",
        select: "-__v -createdAt -updatedAt -referees -_id",
    },
    {
        path: "userId",
        model: "User",
        select: "-__v -emailVerifiedAt -deletedAt -password -lastLoginAt -national_id -createdAt -updatedAt -en.job -fa.job -en.study_field -fa.study_field -en.institute -fa.institute -en.degree -fa.degree -gender -en.bio -fa.bio -role -faRole",
    },
    {
        path: "arbitration.refereeId",
        model: "User",
        select: "-__v -emailVerifiedAt -deletedAt -password -lastLoginAt -national_id -createdAt -updatedAt -en.job -fa.job -en.study_field -fa.study_field -en.institute -fa.institute -en.degree -fa.degree -gender -en.bio -fa.bio -role -faRole",
    },
];

const additionalPopulate = {
    path: "referee",
    model: "User",
};

const rolePopulateOptions = {
    user: {
        path: "referees",
        model: "JudgingArticle",
        select: "-__v -scientificMessage",
        populate: additionalPopulate,
    },
    admin: {
        path: "referees",
        model: "JudgingArticle",
        populate: additionalPopulate,
    },
    scientific: {
        path: "referees",
        model: "JudgingArticle",
        populate: additionalPopulate,
    },
};

const populateOptionsFun = (role) => {
    const optionsCopy = [...populateOptions];
    const addObj = rolePopulateOptions[role];

    if (addObj) {
        optionsCopy.push(addObj);
    }

    return optionsCopy;
};

export const create = async (data, user = null) => {
    if (user && user.role.name === "user") {
        const isEligibleForArticleAddition =
            user.billingStatus.articles === "Infinity" ||
            user.billingStatus.articles > 0;

        if (isEligibleForArticleAddition) {
            if (user.billingStatus.articles !== "Infinity") {
                await updateUser(user._id, {
                    billingStatus: {
                        ...user.billingStatus,
                        articles: Number(user.billingStatus.articles) - 1,
                    },
                });
            }
            return await crudFactory.create(Article)(data);
        } else {
            throw new APIError({
                message: getMessage("errors.not_possible_add_article"),
                status: constants.BAD_REQUEST,
            });
        }
    }
    return await crudFactory.create(Article)(data);
};

export const update = async (id, data, user) => {
    if (user.role.name !== "admin" && user.role.name !== "scientific") {
        if (user.role.name !== "user") {
            throw new APIError({
                message: getMessage("errors.editArticle"),
                status: constants.BAD_REQUEST,
            });
        }

        await checkEditArticleDeadline();
        await checkArticleStatus(id);
    }

    const newData = createNewData(data, await get(id), user.role.name);
    return await crudFactory.update(Article)(id, newData);
};

const checkEditArticleDeadline = async () => {
    const hamayesh = await HamayeshDetail.findOne();
    if (hamayesh.dates.editArticle < Date.now()) {
        throw new APIError({
            message: getMessage("errors.editArticle"),
            status: constants.BAD_REQUEST,
        });
    }
};

const checkArticleStatus = async (id) => {
    const article = await get(id);
    if (article.status !== "review") {
        throw new APIError({
            message: getMessage("errors.status_not_review"),
            status: constants.BAD_REQUEST,
        });
    }
};

const createNewData = (data, article, roleName) => {
    const result = {
        title: data.title || article.title,
        description: data.description || article.description,
        category: data.category || article.category,
        articleFiles: data.articleFiles || article.articleFiles,
        presentationFiles: data.presentationFiles || article.presentationFiles,
        status: "changed",
        rate: article.rate,
    };

    if (roleName === "admin" || "scientific") {
        result.status = data.status || article.status;
        result.rate = data.rate || article.rate;
    }
    return result;
};

export const get = async (id, role = null) => {
    return await crudFactory.get(Article)(id, {
        populate: populateOptionsFun(role),
    });
};

export const getAll = async (options, role = null) => {
    return await crudFactory.getAll(Article)({
        ...options,
        populate: populateOptionsFun(role),
    });
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
