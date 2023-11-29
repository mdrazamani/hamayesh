import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            unique: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                number: {
                    type: Number,
                },
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "pricingRule",
                },
                itemType: {
                    type: String,
                },
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
        taxPrice: {
            type: Number,
        },
        discountPrice: {
            type: Number,
        },
        total: {
            type: Number,
            required: true,
        },
        articleNumber: {
            type: String,
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const generateInvoiceNumber = () => {
    const length = Math.random() > 0.5 ? 8 : 9;
    let number = "";

    for (let i = 0; i < length; i++) {
        number += Math.floor(Math.random() * 10).toString();
    }

    return number;
};

invoiceSchema.pre("save", async function (next) {
    if (!this.invoiceNumber) {
        this.invoiceNumber = generateInvoiceNumber();
    }
    next();
});
const Invoice = mongoose.model("invoice", invoiceSchema);

export default Invoice;
