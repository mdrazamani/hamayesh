import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAllUsers } from "../../services/user.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10, ...query } = req.query;
        const users = await getAllUsers(
            Number(page),
            Number(pageSize),
            query,
            next
        );
        if (users)
            res.respond(constants.OK, getMessage("success.success"), users);
    } catch (error) {
        return next(error);
    }
};
