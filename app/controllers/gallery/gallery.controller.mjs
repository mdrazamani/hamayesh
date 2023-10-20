// gallery.controller.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import {
    addImageToGallery,
    updateImageInGallery,
    deleteImageFromGallery,
} from "../../services/gallery.service.mjs";

// For handling nested images within a gallery
export const addImageController = async (req, res, next) => {
    try {
        const { galleryId } = req.params; // gallery ID
        const newImage = req.body; // data for the new image
        const updatedGallery = await addImageToGallery(galleryId, newImage);
        res.respond(
            constants.OK,
            getMessage("success.imageAdded"),
            updatedGallery
        );
    } catch (error) {
        next(error);
    }
};

export const updateImageController = async (req, res, next) => {
    try {
        const { galleryId, imageId } = req.params; // gallery ID and image ID
        const imageUpdateData = req.body;
        const updatedGallery = await updateImageInGallery(
            galleryId,
            imageId,
            imageUpdateData
        );
        res.respond(
            constants.OK,
            getMessage("success.imageUpdated"),
            updatedGallery
        );
    } catch (error) {
        next(error);
    }
};

export const deleteImageController = async (req, res, next) => {
    try {
        const { galleryId, imageId } = req.params; // gallery ID and image ID
        await deleteImageFromGallery(galleryId, imageId);
        res.respond(constants.OK, getMessage("success.imageDeleted"));
    } catch (error) {
        next(error);
    }
};
