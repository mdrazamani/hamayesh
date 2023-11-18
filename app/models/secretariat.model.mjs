import mongoose from "mongoose";
import constants from "../../utils/constants.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";

import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";
import APIError from "../../utils/errors.mjs";

const lang = await loadLanguageSetting();

const secretariatType = ["academic", "executive", "policy", "conferance"];
const secretariatSchema = new mongoose.Schema(
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

        boss: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // or another relevant model
            required: true,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // assuming 'User' is the model name for your userSchema
            },
        ],
        type: {
            type: String,
            enum: secretariatType, // replace with your actual types
            required: true,
            unique: true, // This ensures no two documents can have the same type
        },
    },
    { timestamps: true }
);

addVirtualFields(secretariatSchema, lang, secretariatSchema.obj.fa);

secretariatSchema.index({ "fa.title": "text", "en.title": "text" }); // example compound index

secretariatSchema.set("toJSON", {
    virtuals: true, // ensures virtual fields are included
    transform: (doc, converted) => {
        delete converted.__v;
        delete converted._id;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, lang, secretariatSchema.obj.fa);
    },
});

secretariatSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, secretariatSchema.obj.fa);
    next();
});

secretariatSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, secretariatSchema.obj.fa);
    next();
});

secretariatSchema.virtual("faType").get(function () {
    if (this.type) {
        // Replace this logic with how you map role names to their corresponding faNames
        // For example, you can use a dictionary or a switch statement.
        const roleNamesToFaNams = {
            executive: "دبیرخانه اجرایی",
            academic: "دبیرخانه علمی",
            policy: "دبیرخانه سیاستگذاری",
            conferance: "دبیرخانه کنفرانس",
        };

        return roleNamesToFaNams[this.type] || "دبیرخانه";
    }
    return "دبیرخانه"; // Or handle this case as you prefer
});
// Pre-save hook to execute before saving a new document
secretariatSchema.pre("save", async function (next) {
    const secretariat = this;

    if (this.type === "conference") {
        const existingConference = await this.constructor.findOne({
            type: "conference",
        });

        if (
            existingConference &&
            existingConference._id.toString() !== this._id.toString()
        ) {
            throw new Error("There can only be one conference type");
        }
    }

    // If 'users' field is provided, ensure it contains unique IDs only
    if (secretariat.isModified("users")) {
        secretariat.users = [...new Set(secretariat.users.map(String))];
    }

    next(); // If all checks pass, proceed with saving the new document
});

const Secretariat = mongoose.model("Secretariat", secretariatSchema);

export default Secretariat;
