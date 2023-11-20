import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAllGrouped } from "../../services/axie.service.mjs";

export const indexOrderedController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 1000, ...query } = req.query;

        const axies = await getAllGrouped({
            page: Number(page),
            items_per_page: Number(items_per_page),
            ...query,
        });
        if (axies)
            res.respond(constants.OK, getMessage("success.success"), axies);
    } catch (error) {
        return next(error);
    }
};
