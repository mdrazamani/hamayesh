import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import {
    getAll,
    getAllArticles,
} from "../../../services/judgingArticle.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;
        const user = req.user;
        let judgings;

        if (
            user &&
            (user.role.name === "admin" || user.role.name === "scientific")
            /*|| user.role.name === "user"*/
        ) {
            judgings = await getAll({
                page: Number(page),
                items_per_page: Number(items_per_page),
                ...query,
            });
        } else if (user.role.name === "referee") {
            judgings = await getAllArticles(
                {
                    page: Number(page),
                    items_per_page: Number(items_per_page),
                    ...query,
                },
                user?._id
            );
        } else {
            throw new APIError({
                message: getMessage("errors.user_not_found"),
                status: constants.BAD_REQUEST,
            });
        }

        if (judgings)
            res.respond(constants.OK, getMessage("success.success"), judgings);
    } catch (error) {
        return next(error);
    }
};
