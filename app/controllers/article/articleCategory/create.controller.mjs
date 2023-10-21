import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { create } from "../../../services/articleCategory.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const articleCategory = await create(req.body);
        if (articleCategory)
            res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
