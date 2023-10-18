// secretariatController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { deleteSecretariat } from "../../services/secretariat.service.mjs"; // Adjust the import path based on your project structure

export const deleteSecretariatController = async (req, res, next) => {
    try {
        await deleteSecretariat(req.params.id);
        res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
