import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { get } from "../../../services/billing/invoice.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const invoice = await get(id);
        if (invoice)
            res.respond(constants.OK, getMessage("success.success"), invoice);
    } catch (error) {
        return next(error);
    }
};
