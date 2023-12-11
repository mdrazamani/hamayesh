import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import APIError from "../../../../utils/errors.mjs";
import { getAllArticles } from "../../../services/judgingArticle.service.mjs";

export const refereeIndexController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;

        if (req.user.role.name !== "referee") {
            throw new APIError({
                message: getMessage("errors.user_not_found"),
                status: constants.BAD_REQUEST,
            });
        }

        const judgings = await getAllArticles(
            {
                page: Number(page),
                items_per_page: Number(items_per_page),
                ...query,
            },
            req.user?._id
        );
        if (judgings)
            res.respond(constants.OK, getMessage("success.success"), judgings);
    } catch (error) {
        return next(error);
    }
};
