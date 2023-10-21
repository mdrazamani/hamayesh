import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/news.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const news = await update(id, req.body);
        if (news)
            res.respond(constants.OK, getMessage("success.success"), news);
    } catch (error) {
        return next(error);
    }
};
