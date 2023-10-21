import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { update } from "../../../services/articleCategory.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const articleCategory = await update(id, req.body);
        if (articleCategory)
            res.respond(
                constants.OK,
                getMessage("success.success"),
                articleCategory
            );
    } catch (error) {
        return next(error);
    }
};
