import mongoose from "mongoose";

const SupporterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        supportType: {
            type: String,
            enum: ["Financial", "Academic"],
            required: true,
        },
        link: {
            type: String,
        },
    },
    { timestamps: true }
);

SupporterSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
    },
});

const Supporter = mongoose.model("Supporter", SupporterSchema);

export default Supporter;
