import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "pricingRule",
            },
        ],
        subtotal: {
            type: Number,
            required: true,
        },
        discounts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "discount",
            },
        ],
        total: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Invoice = mongoose.model("invoice", invoiceSchema);

export default Invoice;
