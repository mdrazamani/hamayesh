import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { create } from "../../services/news.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const news = await create(req.body, req.user);
        if (news) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
