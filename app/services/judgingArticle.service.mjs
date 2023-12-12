import crudFactory from "../../utils/crudFactory.mjs";
import JudgingArticle from "../models/JudgingArticles.model.mjs";

const populateOptions = [
    {
        path: "article",
        model: "Article",
        // select: "-__v -createdAt -updatedAt -referees -_id",
    }, // -__v
    {
        path: "referee",
        model: "User",
        select: "-__v -emailVerifiedAt -deletedAt -password -lastLoginAt -national_id -createdAt -updatedAt -en.job -fa.job -en.study_field -fa.study_field -en.institute -fa.institute -en.degree -fa.degree -gender -en.bio -fa.bio -role -faRole", // Assuming you want to exclude the password field
    }, // -__v -password
];

export const check = async (data) => {
    const { article, referees } = data;

    const existingEntries = await JudgingArticle.find({ article });

    const refereesToAdd = referees.filter(
        (referee) =>
            !existingEntries.some(
                (entry) => entry.referee.toString() === referee
            )
    );

    for (const refereeId of refereesToAdd) {
        await create({
            article,
            referee: refereeId,
        });
    }

    const refereesToDelete = existingEntries.filter(
        (entry) => !referees.includes(entry.referee.toString())
    );

    for (const entry of refereesToDelete) {
        await deleteDoc(entry._id);
    }

    return await getAllReferee(
        {
            page: 1,
            items_per_page: 1000,
        },
        article
    );
};

export const create = async (data) => {
    return await crudFactory.create(JudgingArticle)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(JudgingArticle)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(JudgingArticle)(id, {
        populate: populateOptions,
    });
};

export const getAll = async (options) => {
    return await crudFactory.getAll(JudgingArticle)({
        ...options,
        populate: populateOptions,
    });
};

export const getAllReferee = async (options, articleId) => {
    return await crudFactory.getAll(JudgingArticle)({
        ...options,
        article: articleId,
        populate: populateOptions,
    });
};

// export const getAllArticles = async (options, refereeId) => {
//     return await crudFactory.getAll(JudgingArticle)({
//         ...options,
//         referee: refereeId,
//         populate: populateOptions,
//     });
// };

export const getAllArticles = async (options, refereeId) => {
    const updatedOptions = {
        ...options,
        referee: refereeId,
    };

    return await crudFactory.getAll(JudgingArticle)({
        ...updatedOptions,
        populate: populateOptions,
    });
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(JudgingArticle)(id);
};
