// speakerController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { updateSpeaker } from "../../services/speaker.service.mjs"; // Adjust the import path based on your project structure

export const updateSpeakerController = async (req, res, next) => {
    try {
        const updatedSpeaker = await updateSpeaker(req.params.id, req.body);
        res.respond(
            constants.OK,
            getMessage("success.updated"),
            updatedSpeaker
        );
    } catch (error) {
        next(error);
    }
};
