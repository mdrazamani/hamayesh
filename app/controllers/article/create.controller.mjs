import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { create } from "../../services/article.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const article = await create(req.body);
        if (article) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
