import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { create } from "../../../services/newsTag.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const newsTag = await create(req.body, next);
        if (newsTag) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
