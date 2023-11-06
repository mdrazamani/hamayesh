import mongoose from "mongoose";

const ArticleCategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: { type: String },
        referees: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },

    { timestamps: true }
);

ArticleCategorySchema.index({
    title: "text",
});

ArticleCategorySchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;
    },
});

const ArticleCategory = mongoose.model(
    "ArticleCategory",
    ArticleCategorySchema
);

export default ArticleCategory;
