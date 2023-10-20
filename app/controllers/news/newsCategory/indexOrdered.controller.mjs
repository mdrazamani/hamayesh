import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { getAllGrouped } from "../../../services/newsCategory.service.mjs";

export const indexOrderedController = async (req, res, next) => {
    try {
        const newsCategories = await getAllGrouped();
        if (newsCategories)
            res.respond(
                constants.OK,
                getMessage("success.success"),
                newsCategories
            );
    } catch (error) {
        return next(error);
    }
};
