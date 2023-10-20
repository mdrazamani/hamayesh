import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { update } from "../../../services/newsCategory.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newsCategory = await update(id, req.body, next);
        if (newsCategory)
            res.respond(
                constants.OK,
                getMessage("success.success"),
                newsCategory
            );
    } catch (error) {
        return next(error);
    }
};
