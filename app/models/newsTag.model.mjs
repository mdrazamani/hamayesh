import mongoose from "mongoose";
import slugify from "slugify";
import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = await loadLanguageSetting();

const NewsTagSchema = new mongoose.Schema(
    {
        fa: {
            title: {
                type: String,
            },
        },
        en: {
            title: {
                type: String,
            },
        },
        slug: {
            type: String,
            unique: true,
        },
    },

    { timestamps: true }
);

addVirtualFields(NewsTagSchema, lang, NewsTagSchema.obj.fa);

NewsTagSchema.index({
    "fa.title": "text",
    "en.title": "text",
    slug: "text",
});

NewsTagSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, lang, NewsTagSchema.obj.fa);
    },
});

NewsTagSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, NewsTagSchema.obj.fa);
    next();
});

NewsTagSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, NewsTagSchema.obj.fa);
    next();
});

// This pre-save middleware will run before saving a new document or updating an existing one
NewsTagSchema.pre("save", function (next) {
    // Only create/update the slug if the title is modified (or is new)
    if ((this.isModified("title") || this.isNew) && !this.slug) {
        this.slug = slugify(this.title, { lower: true });
    }
    next();
});

const NewsTag = mongoose.model("NewsTag", NewsTagSchema);

export default NewsTag;
