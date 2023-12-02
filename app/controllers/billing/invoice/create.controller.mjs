import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { justAdmin } from "../../../../utils/justAdmin.mjs";
import { create } from "../../../services/billing/invoice.service.mjs";

export const createController = async (req, res, next) => {
    try {
        // req.body.userId = justAdmin(req.body.user, req.user);
        req.body.userId = req.body.user;

        const invoice = await create(req.body);
        if (invoice) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
