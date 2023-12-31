import mongoose from "mongoose";

const ACTION_TYPES = ["create", "update", "delete", "login", "logout", "get"];

const EventLogSchema = new mongoose.Schema(
    {
        collectionName: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        path: {
            type: String,
            required: true,
        },
        method: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            required: true,
            enum: ACTION_TYPES,
        },
        ipAddress: {
            type: String,
        },
        userAgent: {
            type: String,
        },
        date: {
            type: Date,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            expires: 2 * 60 * 60 * 1000, // This will remove the document when the current date and time is >= expiresAt
        },
        status: {
            type: Number,
        },
    },
    { timestamps: true }
);

const EventLog = mongoose.model("EventLog", EventLogSchema);

export default EventLog;
