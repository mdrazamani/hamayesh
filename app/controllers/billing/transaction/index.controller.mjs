import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { getAll } from "../../../services/billing/transaction.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const roleName = req.user.role.name;
        const userId = req.user.id; //
        const { page = 1, items_per_page = 10, ...query } = req.query;

        const pricings = await getAll(
            {
                page: Number(page),
                items_per_page: Number(items_per_page),
                ...query,
            },
            roleName === "user" ? userId : ""
        );
        if (pricings)
            res.respond(constants.OK, getMessage("success.success"), pricings);
    } catch (error) {
        return next(error);
    }
};
