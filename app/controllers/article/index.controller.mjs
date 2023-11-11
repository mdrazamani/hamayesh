import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAll, getAllReferee } from "../../services/article.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;

        const roleName = req.user.role.name;

        let articles = "";
        if (roleName !== "referee") {
            articles = await getAll({
                page: Number(page),
                items_per_page: Number(items_per_page),
                ...(roleName === "user" ? { userId: req.user.id } : {}),
                ...query,
            });
        } else {
            articles = await getAllReferee(
                {
                    page: Number(page),
                    items_per_page: Number(items_per_page),
                    ...query,
                },
                req.user.id
            );
        }

        if (articles)
            res.respond(constants.OK, getMessage("success.success"), articles);
    } catch (error) {
        return next(error);
    }
};
