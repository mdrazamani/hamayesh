import mongoose from "mongoose";
import slugify from "slugify";

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
        converted.id = doc._id;
    },
});

// This pre-save middleware will run before saving a new document or updating an existing one
NewsSchema.pre("save", function (next) {
    // Only create/update the slug if the title is modified (or is new)
    if (this.isModified("title") || this.isNew) {
        this.slug = slugify(this.title, { lower: true });
    }
    next();
});

const News = mongoose.model("News", NewsSchema);

export default News;
