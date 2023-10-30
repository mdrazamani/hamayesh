import mongoose from "mongoose";

const NewsCategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        slug: {
            type: String,
            unique: true,
        },
        image: {
            type: String,
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "NewsCategory",
        },
        level: {
            type: Number,
            default: 1,
        },
    },

    { timestamps: true }
);

NewsCategorySchema.index({
    title: "text",
    slug: "text",
    level: "text",
});

NewsCategorySchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
    },
});

const NewsCategory = mongoose.model("NewsCategory", NewsCategorySchema);

export default NewsCategory;
