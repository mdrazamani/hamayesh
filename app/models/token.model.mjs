import mongoose from "mongoose";
import { getMessage } from "../../config/i18nConfig.mjs";
import APIError from "../../utils/errors.mjs";
import constants from "../../utils/constants.mjs";

const tokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            index: true, // Index for faster queries
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true, // Index for faster queries
        },
        expiresAt: {
            type: Date,
            required: true,
            expires: 0, // This will remove the document when the current date and time is >= expiresAt
        },
    },
    {
        timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
    }
);

tokenSchema.pre("save", async function (next) {
    try {
        const existingTokensCount = await this.model("Token").countDocuments({
            userId: this.userId,
        });

        if (existingTokensCount >= 3) {
            throw new APIError({
                message: getMessage("errors.more_than_3_active_tokens"),
                status: constants.BAD_REQUEST,
            });
        }
        next(); // No error, proceed to save
    } catch (err) {
        next(err); // In case of an unexpected error, ensure it's handled
    }
});

export default mongoose.model("Token", tokenSchema);
