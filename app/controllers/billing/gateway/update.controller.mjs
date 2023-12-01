import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { update } from "../../../services/billing/gateway.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const gateway = await update(id, req.body);
        if (gateway)
            res.respond(constants.OK, getMessage("success.success"), gateway);
    } catch (error) {
        return next(error);
    }
};
