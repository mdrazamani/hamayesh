import mongoose from "mongoose";
import slugify from "slugify";

const NewsTagSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            unique: true,
        },
    },

    { timestamps: true }
);

NewsTagSchema.index({
    title: "text",
    slug: "text",
});

// This pre-save middleware will run before saving a new document or updating an existing one
NewsTagSchema.pre("save", function (next) {
    // Only create/update the slug if the title is modified (or is new)
    if (this.isModified("title") || this.isNew) {
        this.slug = slugify(this.title, { lower: true });
    }
    next();
});

NewsTagSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;
    },
});

const NewsTag = mongoose.model("NewsTag", NewsTagSchema);

export default NewsTag;
