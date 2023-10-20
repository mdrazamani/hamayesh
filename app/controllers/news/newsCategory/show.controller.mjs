import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { get } from "../../../services/newsCategory.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newsCategory = await get(id);
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
