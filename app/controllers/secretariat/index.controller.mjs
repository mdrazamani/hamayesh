// secretariatController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAllSecretariats } from "../../services/secretariat.service.mjs"; // Adjust the import path based on your project structure

export const getAllSecretariatsController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;

        const secretariats = await getAllSecretariats({
            page: Number(page),
            items_per_page: Number(items_per_page),
            ...query,
        });
        res.respond(constants.OK, getMessage("success.success"), secretariats);
    } catch (error) {
        next(error);
    }
};
