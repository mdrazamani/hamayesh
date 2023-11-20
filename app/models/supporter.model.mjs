import mongoose from "mongoose";
import path from "path";
import fs from "fs";

import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = loadLanguageSetting();

const SupporterSchema = new mongoose.Schema(
    {
        fa: {
            name: {
                type: String,
            },
        },
        en: {
            name: {
                type: String,
            },
        },
        logo: {
            type: String,
            required: true,
        },
        supportType: {
            type: String,
            enum: ["Financial", "Academic"],
            required: true,
        },
        link: {
            type: String,
        },
    },
    { timestamps: true }
);

addVirtualFields(SupporterSchema, SupporterSchema.obj.fa);

SupporterSchema.index({
    "fa.name": "text",
    "en.name": "text",
    supportType: "text",
});

SupporterSchema.set("toJSON", {
    virtuals: true, // ensures virtual fields are included
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, SupporterSchema.obj.fa);
    },
});

SupporterSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, SupporterSchema.obj.fa);
    next();
});

SupporterSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, SupporterSchema.obj.fa);
    next();
});

SupporterSchema.virtual("faType").get(function () {
    if (this.supportType) {
        // Replace this logic with how you map role names to their corresponding faNames
        // For example, you can use a dictionary or a switch statement.
        const roleNamesToFaNams = {
            Financial: "حامی مالی",
            Academic: "حامی علمی",
        };

        return roleNamesToFaNams[this.supportType] || "حامی علمی";
    }
    return "حامی علمی"; // Or handle this case as you prefer
});

SupporterSchema.pre("findOneAndUpdate", async function (next) {
    try {
        const query = this;
        const update = query.getUpdate();

        if (update?.logo) {
            const currentDocument = await query.findOne(this.getQuery());

            if (currentDocument && currentDocument.logo) {
                const imagePath = path.join(
                    process.cwd(),
                    currentDocument.logo
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

const Supporter = mongoose.model("Supporter", SupporterSchema);

export default Supporter;
