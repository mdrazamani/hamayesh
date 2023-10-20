// sliderController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAllSliders } from "../../services/slider.service.mjs";

export const getAllSlidersController = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10, ...query } = req.query;

        const sliders = await getAllSliders({
            page: Number(page),
            pageSize: Number(pageSize),
            ...query,
        });
        res.respond(constants.OK, getMessage("success.success"), sliders);
    } catch (error) {
        next(error);
    }
};
