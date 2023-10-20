// gallery.controller.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getGallery } from "../../services/gallery.service.mjs";

export const getGalleryController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const gallery = await getGallery(id);
        res.respond(constants.OK, getMessage("success.success"), gallery);
    } catch (error) {
        next(error);
    }
};
