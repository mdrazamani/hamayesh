import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { get } from "../../../services/billing/transaction.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pricing = await get(id);
        if (pricing)
            res.respond(constants.OK, getMessage("success.success"), pricing);
    } catch (error) {
        return next(error);
    }
};
