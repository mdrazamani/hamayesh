import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "NewsCategory",
        },
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
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
    },
});

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
