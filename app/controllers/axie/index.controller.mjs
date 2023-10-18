import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAll } from "../../services/axie.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10, ...query } = req.query;

        const axies = await getAll({
            page: Number(page),
            pageSize: Number(pageSize),
            ...query,
        });
        if (axies)
            res.respond(constants.OK, getMessage("success.success"), axies);
    } catch (error) {
        return next(error);
    }
};
