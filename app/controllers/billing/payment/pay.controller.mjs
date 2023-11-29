import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { create } from "../../../services/billing/invoice.service.mjs";

export const payController = async (req, res, next) => {
    try {
        if (!req.body?.userId) if (req.user) req.body.userId = req.user?._id;
        const invoice = await create(req.body);
        if (invoice) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
