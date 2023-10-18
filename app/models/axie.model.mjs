import mongoose from "mongoose";

const AxieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Axie",
        },
        level: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

AxieSchema.index({
    title: "text",
});

AxieSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted.__v;
    },
});

const Axie = mongoose.model("Axie", AxieSchema);

export default Axie;
