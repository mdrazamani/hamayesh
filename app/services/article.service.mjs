import { getMessage } from "../../config/i18nConfig.mjs";
import crudFactory from "../../utils/crudFactory.mjs";
import APIError from "../../utils/errors.mjs";
import Article from "../models/article.model.mjs";
import HamayeshDetail from "../models/hamayeshDetail.model.mjs";
import { getAll as getAllJudging } from "./judgingArticle.service.mjs";
import { update as updateUser } from "./user.service.mjs";

const populateOptions = [
    {
        path: "category",
        model: "ArticleCategory",
        select: "-__v -createdAt -updatedAt -referees -_id",
    }, // -__v
    {
        path: "userId",
        model: "User",
        select: "-__v -emailVerifiedAt -deletedAt -password -lastLoginAt -national_id -createdAt -updatedAt -en.job -fa.job -en.study_field -fa.study_field -en.institute -fa.institute -en.degree -fa.degree -gender -en.bio -fa.bio -role -faRole", // Assuming you want to exclude the password field
    }, // -__v -password
    {
        path: "arbitration.refereeId",
        model: "User",
        select: "-__v -emailVerifiedAt -deletedAt -password -lastLoginAt -national_id -createdAt -updatedAt -en.job -fa.job -en.study_field -fa.study_field -en.institute -fa.institute -en.degree -fa.degree -gender -en.bio -fa.bio -role -faRole", // Exclude sensitive fields
    }, // -__v -password
];
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

// export const update = async (id, data, user) => {
//     if (user.role.name === "admin" || user.role.name === "scientific")
//         return await crudFactory.update(Article)(id, data);
//     else if (user.role.name === "user") {
//         const hamayesh = await HamayeshDetail.findOne();

//         if (hamayesh.dates.editArticle < Date.now()) {
//             throw new APIError({
//                 message: getMessage("errors.editArticle"),
//                 status: constants.BAD_REQUEST,
//             });
//         }

//         const article = await get(id);
//         if (article.status !== "review") {
//             throw new APIError({
//                 message: getMessage("errors.status_not_review"),
//                 status: constants.BAD_REQUEST,
//             });
//         }

//         const newData = {
//             title: data.title ? data?.title : article?.title,
//             description: data.description
//                 ? data?.description
//                 : article?.description,
//             category: data.category ? data?.category : article?.category,
//             articleFiles: data.articleFiles
//                 ? data?.articleFiles
//                 : article?.articleFiles,
//             presentationFiles: data.presentationFiles
//                 ? data?.presentationFiles
//                 : article?.presentationFiles,
//             status: "changed",
//         };

//         return await crudFactory.update(Article)(id, newData);
//     } else {
//         throw new APIError({
//             message: getMessage("errors.editArticle"),
//             status: constants.BAD_REQUEST,
//         });
//     }
// };

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

    const newData = createNewData(data, await get(id));
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

const createNewData = (data, article) => {
    return {
        title: data.title || article.title,
        description: data.description || article.description,
        category: data.category || article.category,
        articleFiles: data.articleFiles || article.articleFiles,
        presentationFiles: data.presentationFiles || article.presentationFiles,
        status: "changed",
    };
};

export const get = async (id) => {
    const article = await crudFactory.get(Article)(id, {
        populate: populateOptions,
    });

    if (!article || !article.data) {
        throw new Error("Article not found or article data is undefined");
    }

    const judgings = await getAllJudging({
        page: 1,
        items_per_page: 1000,
        article: id,
    });

    if (judgings.data && judgings.data.length > 0) {
        article.data.referees = judgings;
    }

    return article;
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
