import mongoose from "mongoose";

const pricingTypes = ["article"];

const discountSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
        },
        percent: {
            type: Number,
            min: 0,
            max: 100,
        },
        type: {
            type: String,
            required: true,
            enum: pricingTypes,
        },
        rules: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "pricingRule",
            },
        ],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Discount = mongoose.model("discount", discountSchema);

export default Discount;
