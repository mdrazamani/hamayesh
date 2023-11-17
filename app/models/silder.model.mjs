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

SliderSchema.index({
    title: "text",
    description: "text",
    link: "link",
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

SliderSchema.pre("findOneAndUpdate", async function (next) {
    try {
        const query = this;
        const update = query.getUpdate();

        if (update?.image) {
            const currentDocument = await query.findOne(this.getQuery());

            if (currentDocument && currentDocument.image) {
                const imagePath = path.join(
                    process.cwd(),
                    currentDocument.image
                );

                try {
                    await fs.unlink(imagePath);
                } catch (error) {
                    // Check for the specific error ENOENT (No such file or directory)
                    if (error.code !== "ENOENT") {
                        throw error; // If it's any other error, rethrow it
                    }
                    // If it's ENOENT, just log it and continue, as the file is already not present
                    console.log(
                        "File already deleted or not found: ",
                        imagePath
                    );
                }
            }
        }
        next();
    } catch (error) {
        console.error("Error in findOneAndUpdate middleware: ", error);
        next(error);
    }
});

const Slider = mongoose.model("Slider", SliderSchema);

export default Slider;
