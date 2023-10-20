import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
const GallerySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true, // slugs should be unique
        },
        images: [
            {
                path: {
                    type: String,
                    required: true, // This is the path to the uploaded file
                },
                title: {
                    type: String, // This could be optional, based on your requirement
                },
            },
        ],
        description: {
            type: String, // You can make it required based on your requirement
        },
        // Additional fields you might consider
        isActive: {
            type: Boolean,
            required: true,
            default: true, // This allows you to make gallery items active or inactive
        },
    },
    { timestamps: true } // Enables automatic createdAt and updatedAt timestamps
);

// Pre middleware that executes before the document is removed
GallerySchema.pre("remove", async function (next) {
    // 'this' now refers to the gallery document being removed. We need to attempt to remove each image.
    if (this.images && this.images.length > 0) {
        // Create a promises array to store all the unlink promises
        const deletionPromises = this.images.map(async (image) => {
            // Construct the full path to the image. Adjust the code if your file storage logic is different.
            const imagePath = path.join(process.cwd(), image.path);
            // Check if the file exists before attempting to delete it.
            try {
                await fs.access(imagePath);
                // If the file exists, delete it.
                await fs.unlink(imagePath);
            } catch (error) {
                // If there's an error (like the file doesn't exist), we could either fail silently, log the error, or stop the entire operation.
                console.error(
                    `Failed to delete image at ${imagePath}: `,
                    error
                );
                // If you want the deletion of the gallery to fail if any image can't be deleted, you'd call next(error) here.
                // Otherwise, to continue attempting to delete other images, don't call next(error).
            }
        });

        // Wait for all deletion attempts to complete.
        try {
            await Promise.all(deletionPromises);
        } catch (error) {
            // Handle errors from the image deletion process, if any. This catch block will only be reached if next(error) is called in the catch block above.
            console.error(
                "An error occurred during the image deletion process: ",
                error
            );
            return next(error); // This will stop the gallery from being deleted.
        }
    }

    next(); // Proceed with the removal of the gallery document.
});
const Gallery = mongoose.model("Gallery", GallerySchema);

export default Gallery;
