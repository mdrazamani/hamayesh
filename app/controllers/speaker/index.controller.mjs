// speakerController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAllSpeakers } from "../../services/speaker.service.mjs"; // Adjust the import path based on your project structure

export const getAllSpeakersController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;

        const speakers = await getAllSpeakers({
            page: Number(page),
            items_per_page: Number(items_per_page),
            ...query,
        });
        res.respond(constants.OK, getMessage("success.success"), speakers);
    } catch (error) {
        next(error);
    }
};
