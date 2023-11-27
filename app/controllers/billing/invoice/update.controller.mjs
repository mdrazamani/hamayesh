import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { update } from "../../../services/billing/invoice.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const invoice = await update(id, req.body);
        if (invoice)
            res.respond(constants.OK, getMessage("success.success"), invoice);
    } catch (error) {
        return next(error);
    }
};
