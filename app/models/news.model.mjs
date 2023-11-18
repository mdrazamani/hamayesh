import mongoose from "mongoose";
import slugify from "slugify";
import path from "path";
import fs from "fs";

import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = await loadLanguageSetting();

const NewsSchema = new mongoose.Schema(
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

        visitNumber: {
            type: Number,
        },
        slug: {
            type: String,
            // unique: true,
        },
        writer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        image: {
            type: String,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "NewsCategory",
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "NewsTag",
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "NewsComment",
            },
        ],
        publishDate: {
            type: Date,
        },
        specialDate: {
            type: Date,
        },
    },

    { timestamps: true }
);

addVirtualFields(NewsSchema, lang, NewsSchema.obj.fa);

NewsSchema.index({
    "fa.title": "text",
    "en.title": "text",
    slug: "text",
});

NewsSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, lang, NewsSchema.obj.fa);
    },
});

NewsSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, NewsSchema.obj.fa);
    next();
});

NewsSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, NewsSchema.obj.fa);
    next();
});

// This pre-save middleware will run before saving a new document or updating an existing one
NewsSchema.pre("save", function (next) {
    // Only create/update the slug if the title is modified (or is new)
    if ((this.isModified("title") || this.isNew) && !this.slug) {
        this.slug = slugify(this.title, { lower: true });
    }
    next();
});

NewsSchema.pre("findOneAndUpdate", async function (next) {
    try {
        const query = this;
        const update = query.getUpdate();

        if (update?.image) {
            const currentDocument = await query.findOne(this.getQuery());

            if (currentDocument && currentDocument.image) {
                const imagePath = path.join(
                    process.cwd(),
                    currentDocument.image
                );

                try {
                    await fs.promises.unlink(imagePath);
                } catch (error) {
                    // Check for the specific error ENOENT (No such file or directory)
                    if (error.code !== "ENOENT") {
                        throw error; // If it's any other error, rethrow it
                    }
                    // If it's ENOENT, just log it and continue, as the file is already not present
                    console.log(
                        "File already deleted or not found: ",
                        imagePath
                    );
                }
            }
        }
        next();
    } catch (error) {
        console.error("Error in findOneAndUpdate middleware: ", error);
        next(error);
    }
});

const News = mongoose.model("News", NewsSchema);

export default News;
