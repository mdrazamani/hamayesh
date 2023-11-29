import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { updateDiscount } from "../../../services/billing/invoice.service.mjs";

export const applyDiscountController = async (req, res, next) => {
    try {
        if (!req.body?.userId) if (req.user) req.body.userId = req.user?._id;

        if (!req.body?.userId) {
            throw new APIError({
                message: getMessage("user_not_found"),
                status: 404,
            });
        }

        const invoice = await updateDiscount(req.body);
        if (invoice) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
