import mongoose from "mongoose";
import Organizer from "../organizer.model.mjs";

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
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organizer",
        },
    },
    { timestamps: true }
);

invoiceSchema.set("toJSON", {
    virtuals: true, // ensures virtual fields are included
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;
    },
});

// Ensure that the virtual is applied to the schema
invoiceSchema.set("toObject", { virtuals: true });

const generateInvoiceNumber = () => {
    const length = Math.random() > 0.5 ? 8 : 9;
    let number = "";

    for (let i = 0; i < length; i++) {
        number += Math.floor(Math.random() * 10).toString();
    }

    return number;
};

invoiceSchema.pre("save", async function (next) {
    try {
        if (!this.invoiceNumber) {
            this.invoiceNumber = generateInvoiceNumber();
        }

        // Find the isMain organizer from the Organizer collection
        const mainOrganizer = await Organizer.findOne({ isMain: true });

        // Set the organizer field in the Invoice document
        this.organizer = mainOrganizer._id;

        next();
    } catch (error) {
        next(error);
    }
});
const Invoice = mongoose.model("invoice", invoiceSchema);

export default Invoice;
