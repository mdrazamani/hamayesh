// secretariatController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getSecretariat } from "../../services/secretariat.service.mjs"; // Adjust the import path based on your project structure

export const getSecretariatController = async (req, res, next) => {
    try {
        const secretariat = await getSecretariat(req.params.id);
        res.respond(constants.OK, getMessage("success.success"), secretariat);
    } catch (error) {
        next(error);
    }
};
