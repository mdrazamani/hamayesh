// speakerController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getSpeaker } from "../../services/speaker.service.mjs"; // Adjust the import path based on your project structure

export const getSpeakerController = async (req, res, next) => {
    try {
        const speaker = await getSpeaker(req.params.id);
        res.respond(constants.OK, getMessage("success.success"), speaker);
    } catch (error) {
        next(error);
    }
};
