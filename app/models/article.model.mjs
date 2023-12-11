import mongoose from "mongoose";
import HamayeshDetail from "./hamayeshDetail.model.mjs";
import APIError from "../../utils/errors.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const ArticleStatus = [
    "new",
    "review",
    "reviewed",
    "reviewedAgain",
    "accepted",
    "changed",
    "pending",
    "failed",
];

const ArticleStatusLog = [
    {
        title: "اضافه شده",
        status: "new",
        textColor: "text-primary",
    },
    {
        title: "ارسال به کاربر برای بازنگری",
        status: "review",
        textColor: "text-warning",
    },
    {
        title: "تغییر یافته توسط کاربر",
        status: "changed",
        textColor: "text-primary",
    },
    {
        title: "بررسی شده توسط داور",
        status: "reviewed",
        textColor: "text-primary",
    },
    {
        title: "بررسی مجدد توسط داور",
        status: "reviewedAgain",
        textColor: "text-primary",
    },
    {
        title: "ارسال شده به داوران",
        status: "pending",
        textColor: "text-primary",
    },
    {
        title: "رد شده",
        status: "failed",
        textColor: "text-danger",
    },
    {
        title: "تائید شده",
        status: "accepted",
        textColor: "text-success",
    },
];

const ArticleSchema = new mongoose.Schema(
    {
        fa: {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
        },
        en: {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ArticleCategory",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        articleFiles: [String],
        presentationFiles: [String],

        status: {
            type: String,
            enum: ArticleStatus,
            default: "new",
        },
        rate: {
            type: Number,
            min: 0,
            max: 100,
        },
        logs: [
            {
                title: {
                    typr: String,
                },
                status: {
                    type: String,
                },
                textColor: {
                    type: String,
                },
                date: {
                    type: Date,
                },
            },
        ],
    },

    { timestamps: true }
);

const addLog = (status, logs) => {
    const statusLog = ArticleStatusLog.find((log) => log.status === status);

    if (statusLog) {
        const newLog = {
            ...statusLog,
            date: new Date(),
        };

        return [...logs, newLog];
    }

    return logs;
};

addVirtualFields(ArticleSchema, ArticleSchema.obj.fa);

ArticleSchema.index({
    "fa.title": "text",
    "en.title": "text",
    category: "text",
    status: "text",
});

ArticleSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, ArticleSchema.obj.fa);
    },
});

ArticleSchema.set("toObject", { virtuals: true });

ArticleSchema.virtual("referees", {
    ref: "JudgingArticle", // This is the model to which you are referring
    localField: "_id", // This is the field in the Article model that you are matching against
    foreignField: "article", // This is the field in the Judging model that corresponds to the ID in the Article model
    justOne: false, // Set to false if you expect an array of Judgings (referees)
});

ArticleSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, ArticleSchema.obj.fa);
    next();
});

ArticleSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, ArticleSchema.obj.fa);
    next();
});

ArticleSchema.pre("save", async function (next) {
    const hamayesh = await HamayeshDetail.findOne();

    if (hamayesh.dates.startArticle > Date.now()) {
        throw new APIError({
            message: getMessage("errors.startArticle"),
            status: constants.BAD_REQUEST,
        });
    }

    if (hamayesh.dates.endArticle < Date.now()) {
        throw new APIError({
            message: getMessage("errors.endArticle"),
            status: constants.BAD_REQUEST,
        });
    }

    if (this.isModified("status")) {
        this.logs = addLog(this.status, this.logs || []);
    }

    next();
});

ArticleSchema.pre("findOneAndUpdate", async function (next) {
    const hamayesh = await HamayeshDetail.findOne();

    if (hamayesh.dates.refeeResult < Date.now()) {
        throw new APIError({
            message: getMessage("errors.refeeResult"),
            status: constants.BAD_REQUEST,
        });
    }

    const update = this.getUpdate();
    if (update.status) {
        const currentDocument = await this.model.findOne(this.getQuery());
        if (currentDocument && update.status !== currentDocument.status) {
            const existingLogs = currentDocument.logs || [];
            this.set("logs", addLog(update.status, existingLogs));
        }
    }

    next();
});

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
