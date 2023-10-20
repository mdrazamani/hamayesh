import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getSlug } from "../../services/news.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const news = await getSlug(slug);
        if (news)
            res.respond(constants.OK, getMessage("success.success"), news);
    } catch (error) {
        return next(error);
    }
};
