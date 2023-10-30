import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";

const SliderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String, // You can make it required based on your requirement
        },
        image: {
            type: String,
            required: true, // This is the path to the uploaded file
        },
        link: {
            type: String, // You can make it required if every slide must redirect somewhere
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true, // This allows you to make slides active or inactive
        },
        order: {
            type: Number,
            required: true,
            default: 0, // Default ordering can be '0' and you can update it based on your sorting logic
        },
    },
    { timestamps: true } // This will create 'createdAt' and 'updatedAt' fields automatically
);

SliderSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;
    },
});

// Pre middleware that executes before the document is removed
SliderSchema.pre("remove", async function (next) {
    try {
        // 'this' now refers to the individual document (slider) being removed
        if (this.image) {
            const imagePath = path.join(process.cwd(), this.image); // adjust if your path reference is different
            await fs.access(imagePath);
            await fs.unlink(imagePath);
            // Log or handle the successful deletion if necessary
        }
        next();
    } catch (error) {
        // Log the error. You might want to handle this differently or even pass the error to 'next'
        console.error("Error removing associated file: ", error);
        next(error); // This will prevent the document from being removed in the case of an error
    }
});

const Slider = mongoose.model("Slider", SliderSchema);

export default Slider;
