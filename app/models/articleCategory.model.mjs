import mongoose from "mongoose";

import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = await loadLanguageSetting();

const ArticleCategorySchema = new mongoose.Schema(
    {
        fa: {
            title: {
                type: String,
            },
            description: { type: String },
        },
        en: {
            title: {
                type: String,
            },
            description: { type: String },
        },
        referees: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },

    { timestamps: true }
);

addVirtualFields(ArticleCategorySchema, lang, ArticleCategorySchema.obj.fa);

ArticleCategorySchema.index({
    "fa.title": "text",
    "en.title": "text",
});

ArticleCategorySchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, lang, ArticleCategorySchema.obj.fa);
    },
});

ArticleCategorySchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, ArticleCategorySchema.obj.fa);
    next();
});

ArticleCategorySchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, ArticleCategorySchema.obj.fa);
    next();
});

const ArticleCategory = mongoose.model(
    "ArticleCategory",
    ArticleCategorySchema
);

export default ArticleCategory;
