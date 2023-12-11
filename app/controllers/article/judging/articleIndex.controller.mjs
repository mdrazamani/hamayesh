import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import APIError from "../../../../utils/errors.mjs";
import { getAllReferee } from "../../../services/judgingArticle.service.mjs";

export const articleIndexController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;

        if (!req.body.articleId) {
            throw new APIError({
                message: getMessage("errors.article_not_found"),
                status: constants.BAD_REQUEST,
            });
        }

        const judgings = await getAllReferee(
            {
                page: Number(page),
                items_per_page: Number(items_per_page),
                ...query,
            },
            req.body.articleId
        );
        if (judgings)
            res.respond(constants.OK, getMessage("success.success"), judgings);
    } catch (error) {
        return next(error);
    }
};
