// sliderController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { updateSlider } from "../../services/slider.service.mjs";

export const updateSliderController = async (req, res, next) => {
    try {
        const updatedSlider = await updateSlider(req.params.id, req.body);
        res.respond(constants.OK, getMessage("success.updated"), updatedSlider);
    } catch (error) {
        next(error);
    }
};
