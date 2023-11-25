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
    return categories.map((cat) => cat._id.toString());
};

export const getAllReferee = async (options, refereeId) => {
    const categories = await ArticleCategory.find({ referees: refereeId });
    const categoryIds = categoryIdMaker(categories);

    return await crudFactory.getAll(Article)({
        ...options,
        $or: [
            {
                "arbitration.refereeId": refereeId,
                category: { $in: categoryIds },
            },
            {
                "arbitration.refereeId": { $exists: false },
                category: { $in: categoryIds },
            },
        ],
        populate: populateOptions,
    });
};

// export const getAllReferee = async (options, refereeId) => {
//     const categories = await ArticleCategory.find({ referees: refereeId });
//     const categoryIds = categories.map((cat) => cat._id);

//     const customQueryConditions = {
//         // $or: [
//         //     { category: { $in: categoryIds } }, // Articles in referee's categories
//         //     { "arbitration.refereeId": refereeId }, // Articles assigned to the current referee
//         // ],
//     };

//     const modifiedOptions = {
//         ...options,
//         filter: customQueryConditions,
//         populate: populateOptions,
//     };

//     return await crudFactory.getAll(Article)(modifiedOptions);
// };

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
