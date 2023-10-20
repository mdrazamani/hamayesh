// gallery.controller.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { createGallery } from "../../services/gallery.service.mjs";

// ... other necessary imports

export const createGalleryController = async (req, res, next) => {
    try {
        const gallery = await createGallery(req.body);
        res.respond(constants.OK, getMessage("success.created"), gallery);
    } catch (error) {
        next(error);
    }
};
