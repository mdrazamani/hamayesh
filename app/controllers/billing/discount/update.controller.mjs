import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { update } from "../../../services/billing/discount.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const discount = await update(id, req.body);
        if (discount)
            res.respond(constants.OK, getMessage("success.success"), discount);
    } catch (error) {
        return next(error);
    }
};
