// gallery.controller.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAllGalleries } from "../../services/gallery.service.mjs";

export const getAllGalleriesController = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10, ...query } = req.query;
        const galleries = await getAllGalleries({
            page: Number(page),
            pageSize: Number(pageSize),
            ...query,
        });
        res.respond(constants.OK, getMessage("success.success"), galleries);
    } catch (error) {
        next(error);
    }
};
