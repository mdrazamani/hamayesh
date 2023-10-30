import mongoose from "mongoose";
import APIError from "../../utils/errors.mjs";
import constants from "../../utils/constants.mjs";

const OrganizerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
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
            description: {
                type: String,
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

OrganizerSchema.index({
    name: "text",
    isMain: 1,
});

OrganizerSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted.__v;
    },
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

const Organizer = mongoose.model("Organizer", OrganizerSchema);

export default Organizer;
