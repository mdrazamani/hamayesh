import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { get } from "../../services/organizer.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const organizer = await get(id, next);
        if (organizer)
            res.respond(constants.OK, getMessage("success.success"), organizer);
    } catch (error) {
        return next(error);
    }
};
