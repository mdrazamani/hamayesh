import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { getAll } from "../../../services/newsComment.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;

        const newsComments = await getAll({
            page: Number(page),
            items_per_page: Number(items_per_page),
            ...query,
        });
        if (newsComments)
            res.respond(
                constants.OK,
                getMessage("success.success"),
                newsComments
            );
    } catch (error) {
        return next(error);
    }
};
