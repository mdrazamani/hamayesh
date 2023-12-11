import mongoose from "mongoose";
import HamayeshDetail from "./hamayeshDetail.model.mjs";
import APIError from "../../utils/errors.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";
import Article from "./article.model.mjs";

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
        faTitle: "تصمیم نهایی",
        enTitle: "Final decision",
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

JudgingArticles.index({
    article: "text",
    referee: "text",
});

JudgingArticles.pre("findOneAndUpdate", async function (next) {
    const hamayesh = await HamayeshDetail.findOne();

    if (hamayesh.dates.refeeResult < Date.now()) {
        throw new APIError({
            message: getMessage("errors.refeeResult"),
            status: constants.BAD_REQUEST,
        });
    }

    const article = await Article.findById(this.article);
    if (
        article &&
        !["review", "reviewed", "changed", "pending"].includes(article.status)
    ) {
        throw new APIError({
            message: getMessage(
                "errors.Currently_there_is_no_possibility_of_judging-this_article"
            ),
            status: constants.BAD_REQUEST,
        });
    }

    if (!this.isNew && this.isModified("rates")) {
        const newRates = this.rates.map((existingRate) => {
            const rateTemplate = rates.find(
                (r) => r._id.toString() === existingRate._id.toString()
            );
            return rateTemplate
                ? { ...rateTemplate, rate: existingRate.rate }
                : existingRate;
        });
        this.rates = newRates;
    }

    if (this.status === "accepted" || this.status === "failed") {
        this.refereeDate = new Date();

        if (article.status === "changed") article.status = "reviewedAgain";
        else article.status = "reviewed";
        article.save();
    }

    next();
});

JudgingArticles.pre("findByIdAndUpdate", async function (next) {
    const hamayesh = await HamayeshDetail.findOne();

    if (hamayesh.dates.refeeResult < Date.now()) {
        throw new APIError({
            message: getMessage("errors.refeeResult"),
            status: constants.BAD_REQUEST,
        });
    }

    const article = await Article.findById(this.article);
    if (
        article &&
        !["review", "reviewed", "changed", "pending"].includes(article.status)
    ) {
        throw new APIError({
            message: getMessage(
                "errors.Currently_there_is_no_possibility_of_judging-this_article"
            ),
            status: constants.BAD_REQUEST,
        });
    }

    if (!this.isNew && this.isModified("rates")) {
        const newRates = this.rates.map((existingRate) => {
            const rateTemplate = rates.find(
                (r) => r._id.toString() === existingRate._id.toString()
            );
            return rateTemplate
                ? { ...rateTemplate, rate: existingRate.rate }
                : existingRate;
        });
        this.rates = newRates;
    }

    if (this.status === "accepted" || this.status === "failed") {
        this.refereeDate = new Date();

        if (article.status === "changed") article.status = "reviewedAgain";
        else article.status = "reviewed";
        article.save();
    }

    next();
});

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
