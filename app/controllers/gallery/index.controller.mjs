// gallery.controller.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAllGalleries } from "../../services/gallery.service.mjs";

export const getAllGalleriesController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;
        const galleries = await getAllGalleries({
            page: Number(page),
            items_per_page: Number(items_per_page),
            ...query,
        });
        res.respond(constants.OK, getMessage("success.success"), galleries);
    } catch (error) {
        next(error);
    }
};
