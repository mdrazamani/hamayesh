import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        invoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "invoice",
        },
        status: {
            type: String,
            enum: ["completed", "failed"],
            default: "failed",
        },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("transaction", transactionSchema);

export default Transaction;
