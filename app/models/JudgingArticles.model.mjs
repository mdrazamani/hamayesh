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
        slug: "s1",
    },
    {
        faTitle: "کیفیت عنوان مقاله",
        enTitle: "Quality of the article title",
        slug: "s2",
    },
    {
        faTitle: "تناسب عنوان با محتوا",
        enTitle: "Suitability of the title with the content",
        slug: "s3",
    },
    {
        faTitle: "تازگی محتوا",
        enTitle: "Freshness of the content",
        slug: "s4",
    },
    {
        faTitle: "کاربردی بودن محتوا",
        enTitle: "Practicality of the content",
        slug: "s5",
    },
    {
        faTitle: "مستند بودن محتوا",
        enTitle: "Documentary nature of the content",
        slug: "s6",
    },
    {
        faTitle: "کیفیت روش شناسی",
        enTitle: "Quality of methodology",
        slug: "s7",
    },
    {
        faTitle: "کیفیت نمایش و بازنمایی مناسب یافته ها",
        enTitle:
            "Quality of presentation and proper representation of findings",
        slug: "s8",
    },
    {
        faTitle: "قابلیت استقبال از سوی مخاطبان کنفرانس",
        enTitle: "Acceptability by conference audience",
        slug: "s9",
    },
    {
        faTitle: "ارزیابی کلی شما از مقاله",
        enTitle: "Your overall assessment of the article",
        slug: "s10",
    },
    {
        faTitle: "تصمیم نهایی",
        enTitle: "Final decision",
        slug: "s11",
    },
    {
        faTitle: "توضیحات، اصلاحات، و پیشنهادها",
        enTitle: "Comments, revisions, and suggestions",
        slug: "s12",
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

    if (!this.isNew && this.isModified("rates")) {
        if (rates.length == 12) {
            const newRates = rates.map((rateTemplate) => {
                const existingRate = this.rates.find(
                    (r) => r.slug === rateTemplate.slug
                );
                return {
                    ...rateTemplate,
                    rate: existingRate ? existingRate.rate : undefined,
                };
            });
            this.rates = newRates;
        }
    }

    if (this.status === "accepted" || this.status === "failed") {
        this.refereeDate = new Date();

        const article = await Article.findById(this.article);
        article.status = "Reviewed";
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
