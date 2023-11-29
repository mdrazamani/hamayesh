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

// Function to translate status to Farsi
const translateStatusToFa = (status) => {
    const translations = {
        completed: "تکمیل شده",
        failed: "ناموفق",
    };
    return translations[status] || status;
};

// Virtual field
transactionSchema.virtual("statusFa").get(function () {
    return translateStatusToFa(this.status);
});

transactionSchema.set("toJSON", {
    virtuals: true, // ensures virtual fields are included
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;
    },
});

const Transaction = mongoose.model("transaction", transactionSchema);

export default Transaction;
