import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { create } from "../../services/organizer.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const organizer = await create(req.body, next);
        if (organizer) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
