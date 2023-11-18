import mongoose from "mongoose";
import APIError from "../../utils/errors.mjs";
import constants from "../../utils/constants.mjs";
import path from "path";
import fs from "fs";

import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = await loadLanguageSetting();

const OrganizerSchema = new mongoose.Schema(
    {
        fa: {
            name: {
                type: String,
            },
            description: {
                type: String,
            },
        },
        en: {
            name: {
                type: String,
            },
            description: {
                type: String,
            },
        },
        logo: {
            type: String,
            required: true,
        },
        link: {
            type: String,
        },
        isMain: {
            type: Boolean,
            default: false,
        },
        details: {
            address: {
                state: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "State",
                },
                city: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "City",
                },
                address: {
                    type: String,
                    required: true,
                    trim: true,
                },
                longitude: {
                    type: Number,
                },
                latitude: {
                    type: Number,
                },
            },
            emails: [
                {
                    type: String,
                },
            ],
            phoneNumbers: [
                {
                    type: String,
                },
            ],
        },
        socials: {
            facebook: {
                type: String,
                default: null, // assuming the link may not be provided
            },
            twitter: {
                type: String,
                default: null, // assuming the link may not be provided
            },
            linkedIn: {
                type: String,
                default: null, // assuming the link may not be provided
            },
            whatsapp: {
                type: String,
                default: null, // assuming the link may not be provided
            },
            telegram: {
                type: String,
                default: null, // assuming the link may not be provided
            },
            // add other platforms as needed
        },
    },
    { timestamps: true }
);

addVirtualFields(OrganizerSchema, lang, OrganizerSchema.obj.fa);

OrganizerSchema.index({
    "fa.name": "text",
    "en.name": "text",
    isMain: 1,
    link: "text",
});

OrganizerSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;

        //multiLanguage
        toJSON(doc, converted, lang, OrganizerSchema.obj.fa);

        // Check if 'state' is an object and has a 'name' property
        if (
            converted.details.address.state &&
            converted.details.address.state.state
        ) {
            // Replace the 'state' object with just the 'state' value
            converted.details.address.state =
                converted.details.address.state.state;
        }
        // Check if 'city' is an object and has a 'name' property
        if (
            converted.details.address.city &&
            converted.details.address.city.city
        ) {
            // Replace the 'city' object with just the 'city' value
            converted.details.address.city =
                converted.details.address.city.city;
        }
    },
});

OrganizerSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, OrganizerSchema.obj.fa);
    next();
});

OrganizerSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, OrganizerSchema.obj.fa);
    next();
});

OrganizerSchema.pre("save", async function (next) {
    if (this.isMain) {
        const existingMain = await this.constructor.findOne({ isMain: true });
        if (
            existingMain &&
            existingMain._id.toString() !== this._id.toString()
        ) {
            throw new APIError(
                getMessage("errors.isMainOrganize"),
                constants.BAD_REQUEST
            );
        }
    }
    next();
});

OrganizerSchema.pre("findOneAndUpdate", async function (next) {
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
const Organizer = mongoose.model("Organizer", OrganizerSchema);

export default Organizer;
