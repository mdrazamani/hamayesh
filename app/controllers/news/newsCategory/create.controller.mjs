import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { create } from "../../../services/newsCategory.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const newsCategory = await create(req.body, next);
        if (newsCategory)
            res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
