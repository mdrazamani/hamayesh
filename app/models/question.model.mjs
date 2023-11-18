import mongoose from "mongoose";

import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = await loadLanguageSetting();

const QuestionSchema = new mongoose.Schema(
    {
        fa: {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            items: [
                {
                    question: {
                        type: String,
                    },
                    response: {
                        type: String,
                    },
                },
            ],
        },
        en: {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            items: [
                {
                    question: {
                        type: String,
                    },
                    response: {
                        type: String,
                    },
                },
            ],
        },
    },
    { timestamps: true }
);

addVirtualFields(QuestionSchema, lang, QuestionSchema.obj.fa);

QuestionSchema.index({
    "fa.title": "text",
    "en.title": "text",
    "fa.description": "text",
    "en.description": "text",
});

QuestionSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted.__v;
        delete converted._id;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, lang, QuestionSchema.obj.fa);

        // Remove _id from each item in the items array
        if (converted.items && Array.isArray(converted.items)) {
            converted.items.forEach((item) => {
                delete item._id;
            });
        }
    },
});

QuestionSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, QuestionSchema.obj.fa);
    next();
});

QuestionSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, QuestionSchema.obj.fa);
    next();
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
