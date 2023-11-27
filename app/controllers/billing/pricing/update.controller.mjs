import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { update } from "../../../services/billing/pricing.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pricing = await update(id, req.body);
        if (pricing)
            res.respond(constants.OK, getMessage("success.success"), pricing);
    } catch (error) {
        return next(error);
    }
};
