// gallery.controller.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { updateGallery } from "../../services/gallery.service.mjs";

export const updateGalleryController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedGallery = await updateGallery(id, req.body);
        res.respond(
            constants.OK,
            getMessage("success.updated"),
            updatedGallery
        );
    } catch (error) {
        next(error);
    }
};
