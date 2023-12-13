import mongoose from "mongoose";
import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";
import crudFactory from "../../utils/crudFactory.mjs";
import APIError from "../../utils/errors.mjs";
import HamayeshDetail from "../models/hamayeshDetail.model.mjs";
import JudgingArticle from "../models/JudgingArticles.model.mjs";

const populateOptions = [
    {
        path: "article",
        model: "Article",
        populate: {
            path: "userId",
            model: "User",
        },
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

// export const update = async (id, data) => {
//     const session = await mongoose.startSession();
//     try {
//         session.startTransaction();

//         // First, update the JudgingArticle document without the rates array
//         const { rates, ...updateData } = data;
//         const updatedEntity = await crudFactory.update(JudgingArticle)(
//             id,
//             updateData,
//             { session }
//         );

//         // Then, if there are rates to update, handle them separately
//         if (rates && rates.length) {
//             for (const rate of rates) {
//                 // Use the updateNestedDocument function to update each rate
//                 await crudFactory.updateNested(JudgingArticle)(
//                     id,
//                     "rates",
//                     rate._id,
//                     { rate: rate.rate },
//                     { session }
//                 );
//             }
//         }

//         // Commit the transaction
//         await session.commitTransaction();

//         return updatedEntity;
//     } catch (error) {
//         // If an error occurs, abort the transaction
//         await session.abortTransaction();
//         throw error;
//     } finally {
//         // End the session
//         session.endSession();
//     }
// };

export const update = async (id, data) => {
    try {
        // Fetch the JudgingArticle document along with the related article
        const judgingArticle = await JudgingArticle.findById(id).populate(
            "article"
        );
        if (!judgingArticle) {
            throw new APIError({
                message: getMessage("errors.judgingArticleNotFound"),
                status: constants.BAD_REQUEST,
            });
        }

        // Check refeeResult date
        const hamayesh = await HamayeshDetail.findOne();
        if (hamayesh.dates.refeeResult < Date.now()) {
            throw new APIError({
                message: getMessage("errors.refeeResult"),
                status: constants.BAD_REQUEST,
            });
        }

        // Validate Article Status
        if (
            ![
                "reviewedAgain",
                "review",
                "reviewed",
                "changed",
                "pending",
            ].includes(judgingArticle.article.status)
        ) {
            throw new APIError({
                message: getMessage(
                    "errors.Currently_there_is_no_possibility_of_judging_this_article"
                ),
                status: constants.BAD_REQUEST,
            });
        }

        // Extract and handle the status update and referee date
        const { rates, status, ...updateData } = data;
        if (status && (status === "accepted" || status === "failed")) {
            updateData.status = status; // Ensuring status is part of the main update
            updateData.refereeDate = new Date();
            // Update article status if necessary
            if (judgingArticle.article.status === "changed") {
                judgingArticle.article.status = "reviewedAgain";
            } else {
                judgingArticle.article.status = "reviewed";
            }
            await judgingArticle.article.save();
        }

        // Perform the main update on JudgingArticle, including status and other fields
        const updatedEntity = await JudgingArticle.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        // Handle rates update
        if (rates && rates.length) {
            for (const rate of rates) {
                await crudFactory.updateNested(JudgingArticle)(
                    id,
                    "rates",
                    rate._id,
                    { rate: rate.rate }
                );
            }
        }

        return updatedEntity;
    } catch (error) {
        throw error;
    }
};

// export const update = async (id, data) => {
//     const session = await mongoose.startSession();
//     try {
//         session.startTransaction();

//         // Fetch the JudgingArticle document along with the related article
//         const judgingArticle = await JudgingArticle.findById(id)
//             .populate("article")
//             .session(session);

//         if (!judgingArticle) {
//             throw new APIError({
//                 message: getMessage("errors.judgingArticleNotFound"),
//                 status: constants.BAD_REQUEST,
//             });
//         }

//         // Check refeeResult date
//         const hamayesh = await HamayeshDetail.findOne().session(session);
//         if (hamayesh.dates.refeeResult < Date.now()) {
//             throw new APIError({
//                 message: getMessage("errors.refeeResult"),
//                 status: constants.BAD_REQUEST,
//             });
//         }

//         // Validate Article Status
//         if (
//             !["review", "reviewed", "changed", "pending"].includes(
//                 judgingArticle.article.status
//             )
//         ) {
//             throw new APIError({
//                 message: getMessage(
//                     "errors.Currently_there_is_no_possibility_of_judging_this_article"
//                 ),
//                 status: constants.BAD_REQUEST,
//             });
//         }

//         // Handle the status update and referee date
//         const { rates, status, ...updateData } = data;
//         if (status && (status === "accepted" || status === "failed")) {
//             updateData.refereeDate = new Date();
//             if (judgingArticle.article.status === "changed") {
//                 judgingArticle.article.status = "reviewedAgain";
//             } else {
//                 judgingArticle.article.status = "reviewed";
//             }
//             await judgingArticle.article.save({ session });
//         }

//         // Update the JudgingArticle document
//         const updatedEntity = await JudgingArticle.findByIdAndUpdate(
//             id,
//             updateData,
//             { new: true, session }
//         );

//         // Handle rates update
//         if (rates && rates.length) {
//             for (const rate of rates) {
//                 await crudFactory.updateNested(JudgingArticle)(
//                     id,
//                     "rates",
//                     rate._id,
//                     { rate: rate.rate },
//                     { session }
//                 );
//             }
//         }

//         // Commit the transaction
//         await session.commitTransaction();
//         return updatedEntity;
//     } catch (error) {
//         // If an error occurs, abort the transaction
//         await session.abortTransaction();
//         throw error;
//     } finally {
//         // End the session
//         session.endSession();
//     }
// };

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

export const getAllArticles = async (options, refereeId) => {
    return await crudFactory.getAll(JudgingArticle)({
        ...options,
        referee: refereeId,
        populate: populateOptions,
    });
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(JudgingArticle)(id);
};
