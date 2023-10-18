// speakerController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { deleteSpeaker } from "../../services/speaker.service.mjs"; // Adjust the import path based on your project structure

export const deleteSpeakerController = async (req, res, next) => {
    try {
        await deleteSpeaker(req.params.id);
        res.respond(constants.OK, getMessage("success.deleted"));
    } catch (error) {
        next(error);
    }
};
