import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { create } from "../../../services/billing/invoice.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const invoice = await create(req.body);
        if (invoice) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
