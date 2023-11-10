import mongoose from "mongoose";
import HamayeshDetail from "./hamayeshDetail.model.mjs";
import APIError from "../../utils/errors.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";

const ArticleStatus = ["success", "pending", "failed"];

const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
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
        arbitration: {
            refereeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            message: {
                type: String,
            },
        },
    },

    { timestamps: true }
);

ArticleSchema.index({
    title: "text",
    slug: "text",
});

ArticleSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;
    },
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
