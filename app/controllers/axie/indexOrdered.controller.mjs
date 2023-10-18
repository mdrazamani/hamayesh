import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAllGrouped } from "../../services/axie.service.mjs";

export const indexOrderedController = async (req, res, next) => {
    try {
        const axies = await getAllGrouped();
        if (axies)
            res.respond(constants.OK, getMessage("success.success"), axies);
    } catch (error) {
        return next(error);
    }
};
