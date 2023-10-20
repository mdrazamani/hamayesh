// sliderController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getSlider } from "../../services/slider.service.mjs";

export const getSliderController = async (req, res, next) => {
    try {
        const slider = await getSlider(req.params.id);
        res.respond(constants.OK, getMessage("success.success"), slider);
    } catch (error) {
        next(error);
    }
};
