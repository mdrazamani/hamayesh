import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["passwordReset", "emailVerification"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, // The record will be removed after an hour
    },
});

const Resetoken = mongoose.model("Resetoken", tokenSchema);

export default Resetoken;
