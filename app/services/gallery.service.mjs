// gallery.service.mjs

import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";
import crudFactory from "../../utils/crudFactory.mjs";
import { deleteFile } from "../../utils/deleteImageFromGallery.mjs";
import APIError from "../../utils/errors.mjs";
import Gallery from "../models/gallery.model.mjs";
import path from "path";

const {
    create,
    update,
    get,
    getAll,
    delete: deleteCrud,
    addNested,
    updateNested,
} = crudFactory;

export const createGallery = create(Gallery);
export const updateGallery = update(Gallery);
export const deleteGallery = deleteCrud(Gallery);
export const getGallery = get(Gallery);
export const getAllGalleries = getAll(Gallery);

// For handling images within a gallery
export const addImageToGallery = (galleryId, imageData) =>
    addNested(Gallery)(galleryId, "images", imageData);

export const updateImageInGallery = (galleryId, imageId, imageData) =>
    updateNested(Gallery)(galleryId, "images", imageId, imageData);

export const deleteImageFromGallery = async (galleryId, imageId) => {
    try {
        // Retrieve the gallery
        const gallery = await Gallery.findById(galleryId);
        if (!gallery) {
            throw new APIError({
                message: getMessage("errors.gallery_not_found"),
                status: constants.NOT_FOUND,
            });
        }

        // Find the specific image
        const image = gallery.images.id(imageId);
        if (!image) {
            throw new APIError({
                message: getMessage("errors.image_not_found"),
                status: constants.NOT_FOUND,
            });
        }

        // Construct the full path to the image file
        const imagePath = path.join(process.cwd(), image.path);

        // Use the utility function to delete the image file
        await deleteFile(imagePath);

        // After successful file deletion, proceed with removing the image reference from the gallery
        // Note: This doesn't delete the gallery document itself, just the image reference within it.
        image.remove(); // This alters the gallery document in memory

        // Save the gallery document to finalize the change in the database
        await gallery.save();

        // If you have additional logic to execute after deletion, place it here

        return gallery; // Return the modified gallery document
    } catch (error) {
        // Handle errors that may have occurred during the process
        console.error("An error occurred during image deletion:", error);
        throw new APIError({
            message: error.message,
            status: error.status || constants.INTERNAL_SERVER_ERROR,
        });
    }
};
