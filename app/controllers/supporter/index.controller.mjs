import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAll } from "../../services/supporter.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10, ...query } = req.query;

        const supporters = await getAll({
            page: Number(page),
            pageSize: Number(pageSize),
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
