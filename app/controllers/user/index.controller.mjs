import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAllUsers } from "../../services/user.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, role, ...query } = req.query;

        // Construct the query for role filtering
        let roleQuery = {};
        if (role) {
            // Assuming 'role' is the role name passed in the query string
            roleQuery["role.name"] = role;
        }

        const users = await getAllUsers({
            page: Number(page),
            items_per_page: Number(items_per_page),
            ...roleQuery, // Include the role query
            ...query,
        });

        if (users)
            res.respond(constants.OK, getMessage("success.success"), users);
    } catch (error) {
        return next(error);
    }
};
