import mongoose from "mongoose";

import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = await loadLanguageSetting();

const AxieSchema = new mongoose.Schema(
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
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Axie",
        },
        level: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

addVirtualFields(AxieSchema, lang, AxieSchema.obj.fa);

AxieSchema.index({
    "fa.title": "text",
    "en.title": "text",
});

AxieSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted.__v;
        delete converted._id;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, lang, AxieSchema.obj.fa);
    },
});

AxieSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, AxieSchema.obj.fa);
    next();
});

AxieSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, AxieSchema.obj.fa);
    next();
});

// Pre-save middleware to handle level assignment
AxieSchema.pre("save", async function (next) {
    // If the document has a parent, fetch the parent's level and set this document's level to parent's level + 1
    if (this.parent) {
        const parentCategory = await Axie.findById(this.parent);
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
    const children = await Axie.find({ parent: categoryId });
    for (let child of children) {
        await Axie.updateOne(
            { _id: child._id },
            { $inc: { level: levelDifference } }
        );

        // Recursively adjust the levels of this child's children
        await adjustChildLevels(child._id, levelDifference);
    }
}

// Pre-remove middleware to handle children when a category is deleted
AxieSchema.pre("remove", async function (next) {
    // If the category to be removed has a parent, set the children's parent to the removed category's parent
    if (this.parent) {
        const parentCategory = await Axie.findById(this.parent);

        // Calculate the level difference for the children of the category being deleted
        const levelDifference = parentCategory.level - this.level;

        // Adjust the levels of the children categories and their descendants
        await adjustChildLevels(this._id, levelDifference);

        // Update the parent of the children to the parent of the category being deleted
        await Axie.updateMany(
            { parent: this._id },
            { parent: parentCategory._id }
        );
    } else {
        // If the category to be removed doesn't have a parent, set the children's parent to null and their levels to 1
        await Axie.updateMany({ parent: this._id }, { parent: null, level: 1 });
    }
    next();
});
// Pre-findOneAndUpdate middleware to prevent invalid parent updates
AxieSchema.pre("findOneAndUpdate", async function (next) {
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
        const children = await Axie.find({ parent: categoryId });

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
AxieSchema.pre("findOneAndUpdate", async function (next) {
    const updatedFields = this.getUpdate();

    // Fetch the current category being updated to get its current level
    const currentCategory = await Axie.findById(this._conditions._id);

    // Check if the parent field is being updated
    if (updatedFields.parent !== undefined) {
        let newLevel;

        // If the parent is being set to null, set the level to 1
        if (updatedFields.parent === null) {
            newLevel = 1;
        } else {
            // If the parent is being set to another category, fetch the new parent's level
            const newParentCategory = await Axie.findById(updatedFields.parent);
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

const Axie = mongoose.model("Axie", AxieSchema);

export default Axie;
