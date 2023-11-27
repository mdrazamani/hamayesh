import mongoose from "mongoose";

const pricingTypes = ["article"];
const pricingSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: pricingTypes,
            unique: true,
        },
        rules: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "pricingRule",
            },
        ],
    },
    { timestamps: true }
);
const Pricing = mongoose.model("pricing", pricingSchema);

export default Pricing;
