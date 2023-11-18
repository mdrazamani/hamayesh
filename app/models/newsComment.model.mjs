import mongoose from "mongoose";
import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = await loadLanguageSetting();

const NewsCommentSchema = new mongoose.Schema(
    {
        fa: {
            comment: {
                type: String,
            },
            userFirstName: {
                type: String,
            },
            userLastName: {
                type: String,
            },
        },
        en: {
            comment: {
                type: String,
            },
            userFirstName: {
                type: String,
            },
            userLastName: {
                type: String,
            },
        },
        likeNumber: {
            type: Number,
            default: 0,
        },
        userEmail: {
            type: String,
        },
        userIp: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },

    { timestamps: true }
);

addVirtualFields(NewsCommentSchema, lang, NewsCommentSchema.obj.fa);

NewsCommentSchema.index({
    "fa.comment": "text",
    "en.comment": "text",
    "fa.userLastName": "text",
    "en.userLastName": "text",
    "fa.userFirstName": "text",
    "en.userFirstName": "text",
    userEmail: "text",
    userIp: "text",
});

NewsCommentSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, lang, NewsCommentSchema.obj.fa);
    },
});

NewsCommentSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, NewsCommentSchema.obj.fa);
    next();
});

NewsCommentSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, NewsCommentSchema.obj.fa);
    next();
});

const NewsComment = mongoose.model("NewsComment", NewsCommentSchema);

export default NewsComment;
