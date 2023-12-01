import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { get } from "../../../services/billing/gateway.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const gateway = await get(id);
        if (gateway)
            res.respond(constants.OK, getMessage("success.success"), gateway);
    } catch (error) {
        return next(error);
    }
};
