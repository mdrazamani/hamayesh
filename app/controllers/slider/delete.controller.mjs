// sliderController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { deleteSlider } from "../../services/slider.service.mjs";

export const deleteSliderController = async (req, res, next) => {
    try {
        await deleteSlider(req.params.id);
        res.respond(constants.OK, getMessage("success.deleted"));
    } catch (error) {
        next(error);
    }
};
