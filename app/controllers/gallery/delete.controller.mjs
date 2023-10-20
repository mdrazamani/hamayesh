// gallery.controller.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { deleteGallery } from "../../services/gallery.service.mjs";

export const deleteGalleryController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteGallery(id);
        res.respond(constants.OK, getMessage("success.deleted"));
    } catch (error) {
        next(error);
    }
};
