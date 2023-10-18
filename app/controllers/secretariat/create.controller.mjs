// secretariatController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { createSecretariat } from "../../services/secretariat.service.mjs"; // Adjust the import path based on your project structure

export const createSecretariatController = async (req, res, next) => {
    try {
        const secretariat = await createSecretariat(req.body);
        res.respond(constants.OK, getMessage("success.success"), secretariat);
    } catch (error) {
        next(error);
    }
};
