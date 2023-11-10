import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAll } from "../../services/article.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;

        const articles = await getAll({
            page: Number(page),
            items_per_page: Number(items_per_page),
            ...(req.user.role.name === "user" ? { userId: req.user.id } : {}),
            ...query,
        });
        if (articles)
            res.respond(constants.OK, getMessage("success.success"), articles);
    } catch (error) {
        return next(error);
    }
};
