import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { create } from "../../../services/billing/gateway.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const gateway = await create(req.body);
        if (gateway) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
