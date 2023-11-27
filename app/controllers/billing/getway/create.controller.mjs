import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { create } from "../../../services/billing/getway.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const getway = await create(req.body);
        if (getway) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
