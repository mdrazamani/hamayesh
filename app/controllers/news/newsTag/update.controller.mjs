import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { update } from "../../../services/newsTag.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newsTag = await update(id, req.body, next);
        if (newsTag)
            res.respond(constants.OK, getMessage("success.success"), newsTag);
    } catch (error) {
        return next(error);
    }
};
