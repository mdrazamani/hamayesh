import mongoose from "mongoose";

const NewsTagSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    },

    { timestamps: true }
);

NewsTagSchema.index({
    title: "text",
    slug: "text",
});

NewsTagSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
    },
});

const NewsTag = mongoose.model("NewsTag", NewsTagSchema);

export default NewsTag;
