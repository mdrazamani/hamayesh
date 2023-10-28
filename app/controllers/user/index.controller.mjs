import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAllUsers } from "../../services/user.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;

        const users = await getAllUsers({
            page: Number(page),
            items_per_page: Number(items_per_page),
            ...query,
        });
        if (users)
            res.respond(constants.OK, getMessage("success.success"), users);
    } catch (error) {
        return next(error);
    }
};
