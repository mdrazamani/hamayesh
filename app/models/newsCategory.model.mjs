import mongoose from "mongoose";
import slugify from "slugify";
import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";
import APIError from "../../utils/errors.mjs";
import path from "path";
import fs from "fs";

import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = loadLanguageSetting();

const NewsCategorySchema = new mongoose.Schema(
    {
        fa: {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
        },
        en: {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
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

addVirtualFields(NewsCategorySchema, NewsCategorySchema.obj.fa);

NewsCategorySchema.index({
    "fa.title": "text",
    "en.title": "text",
    slug: "text",
    level: "text",
});

NewsCategorySchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, NewsCategorySchema.obj.fa);
    },
});

NewsCategorySchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, NewsCategorySchema.obj.fa);
    next();
});

NewsCategorySchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, NewsCategorySchema.obj.fa);
    next();
});

// This pre-save middleware will run before saving a new document or updating an existing one
NewsCategorySchema.pre("save", function (next) {
    // Only create/update the slug if the title is modified (or is new)
    if ((this.isModified("title") || this.isNew) && !this.slug) {
        this.slug = slugify(this.title, { lower: true });
    }
    next();
});

// Pre-save middleware to handle level assignment
NewsCategorySchema.pre("save", async function (next) {
    // If the document has a parent, fetch the parent's level and set this document's level to parent's level + 1
    if (this.parent) {
        const parentCategory = await NewsCategory.findById(this.parent);
        if (parentCategory) {
            this.level = parentCategory.level + 1;
        }
    } else {
        // If the document doesn't have a parent, set its level to 1
        this.level = 1;
    }
    next();
});

// Helper function to recursively adjust levels of children categories
async function adjustChildLevels(categoryId, levelDifference) {
    const children = await NewsCategory.find({ parent: categoryId });
    for (let child of children) {
        await NewsCategory.updateOne(
            { _id: child._id },
            { $inc: { level: levelDifference } }
        );

        // Recursively adjust the levels of this child's children
        await adjustChildLevels(child._id, levelDifference);
    }
}

// Pre-remove middleware to handle children when a category is deleted
NewsCategorySchema.pre("remove", async function (next) {
    // If the category to be removed has a parent, set the children's parent to the removed category's parent
    if (this.parent) {
        const parentCategory = await NewsCategory.findById(this.parent);

        // Calculate the level difference for the children of the category being deleted
        const levelDifference = parentCategory.level - this.level;

        // Adjust the levels of the children categories and their descendants
        await adjustChildLevels(this._id, levelDifference);

        // Update the parent of the children to the parent of the category being deleted
        await NewsCategory.updateMany(
            { parent: this._id },
            { parent: parentCategory._id }
        );
    } else {
        // If the category to be removed doesn't have a parent, set the children's parent to null and their levels to 1
        await NewsCategory.updateMany(
            { parent: this._id },
            { parent: null, level: 1 }
        );
    }
    next();
});
// Pre-findOneAndUpdate middleware to prevent invalid parent updates
NewsCategorySchema.pre("findOneAndUpdate", async function (next) {
    const updatedFields = this.getUpdate();

    // Check if the parent field is being updated
    if (updatedFields.parent !== undefined) {
        const categoryId = this._conditions._id;

        // Prevent category from choosing itself as a parent
        if (updatedFields.parent?.toString() === categoryId.toString()) {
            throw new APIError({
                message: getMessage("A category cannot be its own parent."),
                status: constants.BAD_REQUEST,
            });
        }

        // Fetch all children of the category being updated
        const children = await NewsCategory.find({ parent: categoryId });

        // Check if the updated parent is one of the children of the category being updated
        for (let child of children) {
            if (child._id.toString() === updatedFields.parent?.toString()) {
                throw new APIError({
                    message: getMessage(
                        "A category cannot set one of its children as its parent."
                    ),
                    status: constants.BAD_REQUEST,
                });
            }
        }
    }
    next();
});

// Pre-findOneAndUpdate middleware to handle level adjustment on parent update
NewsCategorySchema.pre("findOneAndUpdate", async function (next) {
    const updatedFields = this.getUpdate();

    // Fetch the current category being updated to get its current level
    const currentCategory = await NewsCategory.findById(this._conditions._id);

    // Check if the parent field is being updated
    if (updatedFields.parent !== undefined) {
        let newLevel;

        // If the parent is being set to null, set the level to 1
        if (updatedFields.parent === null) {
            newLevel = 1;
        } else {
            // If the parent is being set to another category, fetch the new parent's level
            const newParentCategory = await NewsCategory.findById(
                updatedFields.parent
            );
            newLevel = newParentCategory.level + 1;
        }

        // Update the level of the category being updated
        this.set({ level: newLevel });

        // Calculate the level difference between the new level and the current level
        const levelDifference = newLevel - currentCategory.level;

        // Adjust the levels of the children categories and their descendants
        await adjustChildLevels(this._conditions._id, levelDifference);
    }
    next();
});

NewsCategorySchema.pre("findOneAndUpdate", async function (next) {
    try {
        const query = this;
        const update = query.getUpdate();

        if (update?.image) {
            const currentDocument = await query.findOne(this.getQuery());

            if (currentDocument && currentDocument.image) {
                const imagePath = path.join(
                    process.cwd(),
                    currentDocument.image
                );

                try {
                    await fs.promises.unlink(imagePath);
                } catch (error) {
                    // Check for the specific error ENOENT (No such file or directory)
                    if (error.code !== "ENOENT") {
                        throw error; // If it's any other error, rethrow it
                    }
                    // If it's ENOENT, just log it and continue, as the file is already not present
                    console.log(
                        "File already deleted or not found: ",
                        imagePath
                    );
                }
            }
        }
        next();
    } catch (error) {
        console.error("Error in findOneAndUpdate middleware: ", error);
        next(error);
    }
});

const NewsCategory = mongoose.model("NewsCategory", NewsCategorySchema);

export default NewsCategory;
