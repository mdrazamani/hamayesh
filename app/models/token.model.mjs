import mongoose from "mongoose";

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

export default mongoose.model("Token", tokenSchema);
