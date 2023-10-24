import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        visitNumber: {
            type: Number,
        },
        slug: {
            type: String,
            unique: true,
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

NewsSchema.index({
    title: "text",
    slug: "text",
});

NewsSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
    },
});

const News = mongoose.model("News", NewsSchema);

export default News;
