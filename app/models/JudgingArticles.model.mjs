import mongoose from "mongoose";
import HamayeshDetail from "./hamayeshDetail.model.mjs";
import APIError from "../../utils/errors.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";
import Article from "./article.model.mjs";
import { updateNestedDocument } from "../../utils/nested.mjs";
const judgingStatus = ["accepted", "pending", "failed"];

const rates = [
    {
        faTitle: "تناسب مقاله با موضوعات کنفرانس",
        enTitle: "Suitability of the article to the conference topics",
    },
    {
        faTitle: "کیفیت عنوان مقاله",
        enTitle: "Quality of the article title",
    },
    {
        faTitle: "تناسب عنوان با محتوا",
        enTitle: "Suitability of the title with the content",
    },
    {
        faTitle: "تازگی محتوا",
        enTitle: "Freshness of the content",
    },
    {
        faTitle: "کاربردی بودن محتوا",
        enTitle: "Practicality of the content",
    },
    {
        faTitle: "مستند بودن محتوا",
        enTitle: "Documentary nature of the content",
    },
    {
        faTitle: "کیفیت روش شناسی",
        enTitle: "Quality of methodology",
    },
    {
        faTitle: "کیفیت نمایش و بازنمایی مناسب یافته ها",
        enTitle:
            "Quality of presentation and proper representation of findings",
    },
    {
        faTitle: "قابلیت استقبال از سوی مخاطبان کنفرانس",
        enTitle: "Acceptability by conference audience",
    },
    {
        faTitle: "ارزیابی کلی شما از مقاله",
        enTitle: "Your overall assessment of the article",
    },
    {
        faTitle: "توضیحات، اصلاحات، و پیشنهادها",
        enTitle: "Comments, revisions, and suggestions",
    },
];

const JudgingArticles = new mongoose.Schema(
    {
        article: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
        },
        referee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        assignmentDate: {
            type: Date,
        },
        files: [
            {
                type: String,
            },
        ],
        message: {
            type: String,
        },
        scientificMessage: {
            type: String,
        },
        rates: [
            {
                faTitle: {
                    type: String,
                },
                enTitle: {
                    type: String,
                },
                slug: {
                    type: String,
                },
                rate: {
                    type: Number,
                    min: 0,
                    max: 100,
                },
            },
        ],
        status: {
            type: String,
            enum: judgingStatus,
            default: "pending",
        },
        refereeDate: {
            type: Date,
        },
    },

    { timestamps: true }
);

JudgingArticles.set("toJSON", {
    virtuals: true, // ensures virtual fields are included
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;
    },
});

JudgingArticles.index({
    article: "text",
    referee: "text",
});

// JudgingArticles.pre("findOneAndUpdate", async function (next) {
//     let update = this.getUpdate();

//     const hamayesh = await HamayeshDetail.findOne();
//     if (hamayesh.dates.refeeResult < Date.now()) {
//         throw new APIError({
//             message: getMessage("errors.refeeResult"),
//             status: constants.BAD_REQUEST,
//         });
//     }

//     // Fetch the JudgingArticle document
//     const judgingArticle = await this.model
//         .findOne(this.getQuery())
//         .populate("article");
//     if (!judgingArticle) {
//         return next(
//             new APIError({
//                 message: getMessage("errors.judgingArticleNotFound"),
//                 status: constants.BAD_REQUEST,
//             })
//         );
//     }

//     // Validate Article Status
//     if (
//         judgingArticle.article &&
//         !["review", "reviewed", "changed", "pending"].includes(
//             judgingArticle.article.status
//         )
//     ) {
//         throw new APIError({
//             message: getMessage(
//                 "errors.Currently_there_is_no_possibility_of_judging_this_article"
//             ),
//             status: constants.BAD_REQUEST,
//         });
//     }

//     // Update Status and Referee Date
//     const statusUpdate = update.status || update.$set?.status;
//     if (
//         statusUpdate &&
//         (statusUpdate === "accepted" || statusUpdate === "failed")
//     ) {
//         judgingArticle.refereeDate = new Date();
//         if (judgingArticle.article) {
//             if (judgingArticle.article.status === "changed") {
//                 judgingArticle.article.status = "reviewedAgain";
//             } else {
//                 judgingArticle.article.status = "reviewed";
//             }
//             await judgingArticle.article.save();
//         }
//     }
//     next();
// });

JudgingArticles.pre("save", async function (next) {
    const hamayesh = await HamayeshDetail.findOne();

    if (hamayesh.dates.refeeResult < Date.now()) {
        throw new APIError({
            message: getMessage("errors.refeeResult"),
            status: constants.BAD_REQUEST,
        });
    }
    this.rates = rates;
    this.assignmentDate = new Date();

    const article = await Article.findById(this.article);
    article.status = "pending";
    article.save();

    next();
});

const JudgingArticle = mongoose.model("JudgingArticle", JudgingArticles);

export default JudgingArticle;
