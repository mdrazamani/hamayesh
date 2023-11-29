import mongoose from "mongoose";

const pricingTypes = ["article", "freeRegistration"];

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
            enum: pricingTypes,
        },
        rules: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "pricingRule",
            },
        ],
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        code: {
            type: String,
            unique: true,
        },
        useNumber: {
            type: Number,
        },
        activity: {
            type: Boolean,
            default: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            default: () => new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
            expires: "0s",
        },
    },
    { timestamps: true }
);

const generateDiscountCode = () => {
    let code = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code.toLowerCase();
};

discountSchema.pre("save", async function (next) {
    if (!this.isModified("code")) {
        this.code = generateDiscountCode();
    }
    next();
});

const Discount = mongoose.model("discount", discountSchema);

export default Discount;
