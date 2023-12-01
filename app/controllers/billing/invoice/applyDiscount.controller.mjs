import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { justAdmin } from "../../../../utils/justAdmin.mjs";
import { updateDiscount } from "../../../services/billing/invoice.service.mjs";

export const applyDiscountController = async (req, res, next) => {
    try {
        req.body.userId = justAdmin(req.body.userId, req.user);

        const invoice = await updateDiscount(req.body);
        if (invoice) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
