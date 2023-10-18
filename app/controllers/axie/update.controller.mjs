import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/axie.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const axie = await update(id, req.body, next);
        if (axie)
            res.respond(constants.OK, getMessage("success.success"), axie);
    } catch (error) {
        return next(error);
    }
};
