import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { create } from "../../services/axie.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const axie = await create(req.body, next);
        if (axie) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
