import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { get } from "../../services/axie.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const axie = await get(id, next);
        if (axie)
            res.respond(constants.OK, getMessage("success.success"), axie);
    } catch (error) {
        return next(error);
    }
};
