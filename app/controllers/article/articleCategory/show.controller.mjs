import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { get } from "../../../services/articleCategory.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const articleCategory = await get(id);
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
