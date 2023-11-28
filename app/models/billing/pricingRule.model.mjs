import mongoose from "mongoose";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../../config/modelChanger.mjs";

const pricingRuleSchema = new mongoose.Schema(
    {
        fa: {
            name: {
                type: String,
            },
            description: {
                type: String,
            },
        },
        en: {
            name: {
                type: String,
            },
            description: {
                type: String,
            },
        },
        number: {
            type: Number,
        },
        price: {
            type: Number,
            required: true,
        },

        additionalInfo: mongoose.Schema.Types.Mixed,
    },
    { timestamps: true }
);

addVirtualFields(pricingRuleSchema, pricingRuleSchema.obj.fa);

pricingRuleSchema.index({
    "fa.name": "text",
    "en.name": "text",
});

pricingRuleSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted.__v;

        //multiLanguage
        toJSON(doc, converted, pricingRuleSchema.obj.fa);
    },
});

pricingRuleSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, pricingRuleSchema.obj.fa);
    next();
});

pricingRuleSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, pricingRuleSchema.obj.fa);
    next();
});

const PricingRule = mongoose.model("pricingRule", pricingRuleSchema);

export default PricingRule;
