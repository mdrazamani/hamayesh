import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { create } from "../../../services/billing/pricing.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const pricing = await create(req.body);
        if (pricing) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
