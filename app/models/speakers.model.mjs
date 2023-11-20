import mongoose from "mongoose";

import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = loadLanguageSetting();

const speakerSchema = new mongoose.Schema(
    {
        fa: {
            title: {
                type: String,
                trim: true, // Ensures spaces are not counted towards the character count
            },
            description: {
                type: String,
                trim: true, // Remove whitespace from both ends of a string
            },
        },
        en: {
            title: {
                type: String,
                trim: true, // Ensures spaces are not counted towards the character count
            },
            description: {
                type: String,
                trim: true, // Remove whitespace from both ends of a string
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
            unique: true, // Each speaker document should be uniquely associated with a user
        },
        // More fields depending on the specifics of your application
    },
    { timestamps: true } // Enables automatic createdAt and updatedAt timestamps
);

addVirtualFields(speakerSchema, speakerSchema.obj.fa);

speakerSchema.index({ "fa.title": "text", "en.title": "text" });

speakerSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, speakerSchema.obj.fa);
    },
});

speakerSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, speakerSchema.obj.fa);
    next();
});

speakerSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, speakerSchema.obj.fa);
    next();
});

// If you need any indexing for efficient querying, add here
// speakerSchema.index({ /* fields to index */ });

// If you require any pre-save checks or operations, add them here
speakerSchema.pre("save", async function (next) {
    // Any necessary pre-save logic

    next(); // Proceed with saving if everything is in order
});

const Speaker = mongoose.model("Speaker", speakerSchema);

export default Speaker;
