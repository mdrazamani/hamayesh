import mongoose from "mongoose";

const EventLogSchema = new mongoose.Schema(
    {
        collectionName: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

const EventLog = mongoose.model("EventLog", EventLogSchema);

export default EventLog;
