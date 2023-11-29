import mongoose from "mongoose";

const pricingTypes = ["article", "freeRegistration"];
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
    {
        timestamps: true,
    }
);
pricingSchema.set("toJSON", {
    virtuals: true, // ensures virtual fields are included
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;
    },
});
const translateStatusToFa = (type) => {
    const translations = {
        article: "مقالات",
    };
    return translations[type] || type;
};

// Virtual field
pricingSchema.virtual("typeFa").get(function () {
    return translateStatusToFa(this.type);
});

const Pricing = mongoose.model("pricing", pricingSchema);

export default Pricing;
