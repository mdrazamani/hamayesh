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
    "Reviewed",
    "accepted",
    "changed",
    "pending",
    "failed",
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

    next();
});

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
