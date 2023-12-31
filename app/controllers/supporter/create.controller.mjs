import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { create } from "../../services/supporter.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const supporter = await create(req.body, next);
        if (supporter) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
