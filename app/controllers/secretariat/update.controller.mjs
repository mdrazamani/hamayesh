// secretariatController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { updateSecretariat } from "../../services/secretariat.service.mjs"; // Adjust the import path based on your project structure

export const updateSecretariatController = async (req, res, next) => {
    try {
        const updatedSecretariat = await updateSecretariat(
            req.params.id,
            req.body
        );
        res.respond(
            constants.OK,
            getMessage("success.success"),
            updatedSecretariat
        );
    } catch (error) {
        next(error);
    }
};
