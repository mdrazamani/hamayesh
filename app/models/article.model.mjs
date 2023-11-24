import mongoose from "mongoose";
import HamayeshDetail from "./hamayeshDetail.model.mjs";
import APIError from "../../utils/errors.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";

import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = loadLanguageSetting();
const ArticleStatus = ["success", "pending", "failed"];
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
            default: "pending",
        },
        arbitrations: [
            {
                refereeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                files: [
                    {
                        type: String,
                    },
                ],
                messages: [
                    {
                        from: {
                            type: String,
                            enum: ["referee", "user"],
                        },
                        message: {
                            type: String,
                        },
                        date: {
                            type: Date,
                        },
                    },
                ],
                rate: { type: Number, min: 1, max: 5 },
                date: { type: Date },
            },
        ],
    },

    { timestamps: true }
);

addVirtualFields(ArticleSchema, ArticleSchema.obj.fa);

ArticleSchema.index({
    "fa.title": "text",
    "en.title": "text",
    category: "text",
    status: "text",
});

ArticleSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, ArticleSchema.obj.fa);
    },
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
    next();
});

ArticleSchema.pre("findOneAndUpdate", async function (next) {
    const hamayesh = await HamayeshDetail.findOne();

    if (hamayesh.dates.editArticle < Date.now()) {
        throw new APIError({
            message: getMessage("errors.editArticle"),
            status: constants.BAD_REQUEST,
        });
    }

    next();
});

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
