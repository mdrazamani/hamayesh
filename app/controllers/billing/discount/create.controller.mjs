import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { create } from "../../../services/billing/discount.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const discount = await create(req.body);
        if (discount) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
