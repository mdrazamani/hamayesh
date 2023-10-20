// sliderController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { createSlider } from "../../services/slider.service.mjs";

export const createSliderController = async (req, res, next) => {
    try {
        const slider = await createSlider(req.body);
        res.respond(constants.OK, getMessage("success.success"), slider);
    } catch (error) {
        next(error);
    }
};
