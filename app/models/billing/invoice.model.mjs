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

invoiceSchema.set("toObject", { virtuals: true });
invoiceSchema.virtual("organizer", {
    get: async function () {
        try {
            const main = await Organizer.findOne({ isMain: true })
                .select(
                    "name description logo details.address details.emails details.phoneNumbers"
                )
                .populate([
                    {
                        path: "details.address.state",
                        model: "State",
                        select: "state -_id",
                    },
                    {
                        path: "details.address.city",
                        model: "City",
                        select: "city -_id",
                    },
                ])
                .exec();

            if (main) {
                return {
                    name: main?.name,
                    description: main?.description,
                    logo: main?.logo,
                    details: {
                        address: `${main?.details?.address?.state}-${main?.details?.address?.city} ${main?.details?.address?.address}`,
                        email:
                            main?.details?.emails.length > 0
                                ? main?.details?.emails[0]
                                : null,
                        phoneNumber:
                            main?.details?.phoneNumbers.length > 0
                                ? main?.details?.phoneNumbers[0]
                                : null,
                    },
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
});

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
