import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getBySlugOrId, getSlug } from "../../services/news.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const news = await getBySlugOrId(slug);
        if (news)
            res.respond(constants.OK, getMessage("success.success"), news);
    } catch (error) {
        return next(error);
    }
};
