import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/organizer.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const organizer = await update(id, req.body, next);
        if (organizer)
            res.respond(constants.OK, getMessage("success.success"), organizer);
    } catch (error) {
        return next(error);
    }
};
