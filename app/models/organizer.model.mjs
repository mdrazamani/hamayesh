import mongoose from "mongoose";
import APIError from "../../utils/errors.mjs";
import constants from "../../utils/constants.mjs";

const OrganizerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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
    },
    { timestamps: true }
);

OrganizerSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
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
