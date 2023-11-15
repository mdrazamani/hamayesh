import mongoose from "mongoose";
import path from "path";
import fs from "fs";

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
    virtuals: true, // ensures virtual fields are included
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;
    },
});
SupporterSchema.index({ name: "text", supportType: "text" });

SupporterSchema.virtual("faType").get(function () {
    if (this.supportType) {
        // Replace this logic with how you map role names to their corresponding faNames
        // For example, you can use a dictionary or a switch statement.
        const roleNamesToFaNams = {
            Financial: "حامی مالی",
            Academic: "حامی علمی",
        };

        return roleNamesToFaNams[this.supportType] || "حامی علمی";
    }
    return "حامی علمی"; // Or handle this case as you prefer
});

SupporterSchema.pre("findOneAndUpdate", async function (next) {
    try {
        // 'this' refers to the query being executed.
        const query = this;
        const update = query.getUpdate();

        // Check if the profile image is being updated
        if (update?.logo) {
            // Retrieve the current document from the database
            const currentDocument = await query.findOne(this.getQuery());

            // Check if there's an existing profile image to delete
            if (currentDocument && currentDocument.logo) {
                const imagePath = path.join(
                    process.cwd(),
                    currentDocument.logo
                );
                await fs.promises.access(imagePath);
                await fs.promises.unlink(imagePath);
                // Log or handle the successful deletion if necessary
            }
        }
        next();
    } catch (error) {
        // Log the error. You might want to handle this differently or even pass the error to 'next'
        console.error("Error removing associated file: ", error);
        next(error); // This will prevent the document from being removed in the case of an error
    }
});

const Supporter = mongoose.model("Supporter", SupporterSchema);

export default Supporter;
