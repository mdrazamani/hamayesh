// secretariatController.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAllSecretariats } from "../../services/secretariat.service.mjs"; // Adjust the import path based on your project structure

export const getAllSecretariatsController = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10, ...query } = req.query;

        const secretariats = await getAllSecretariats({
            page: Number(page),
            pageSize: Number(pageSize),
            ...query,
        });
        res.respond(constants.OK, getMessage("success.success"), secretariats);
    } catch (error) {
        next(error);
    }
};
