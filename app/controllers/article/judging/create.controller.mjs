import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { check } from "../../../services/judgingArticle.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const judging = await check(req.body);
        if (judging) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
