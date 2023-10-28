import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAll } from "../../services/supporter.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;

        const supporters = await getAll({
            page: Number(page),
            items_per_page: Number(items_per_page),
            ...query,
        });
        if (supporters)
            res.respond(
                constants.OK,
                getMessage("success.success"),
                supporters
            );
    } catch (error) {
        return next(error);
    }
};
