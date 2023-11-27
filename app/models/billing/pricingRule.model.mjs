import mongoose from "mongoose";

const pricingRuleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },

        additionalInfo: mongoose.Schema.Types.Mixed,
    },
    { timestamps: true }
);

const PricingRule = mongoose.model("pricingRule", pricingRuleSchema);

export default PricingRule;
