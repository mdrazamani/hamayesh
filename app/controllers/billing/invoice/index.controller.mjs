import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { getAll } from "../../../services/billing/invoice.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, items_per_page = 10, ...query } = req.query;
        const roleName = req.user.role.name;

        const invoices = await getAll({
            page: Number(page),
            items_per_page: Number(items_per_page),
            ...(roleName === "user" ? { user: req.user.id } : {}),

            ...query,
        });
        if (invoices)
            res.respond(constants.OK, getMessage("success.success"), invoices);
    } catch (error) {
        return next(error);
    }
};
