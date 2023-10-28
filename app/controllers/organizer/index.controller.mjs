import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAllOrganazers } from "../../services/organizer.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;

        const organizers = await getAllOrganazers({
            page: Number(page),
            items_per_page: Number(items_per_page),
            ...query,
        });
        if (organizers)
            res.respond(
                constants.OK,
                getMessage("success.success"),
                organizers
            );
    } catch (error) {
        return next(error);
    }
};
