import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { update } from "../../../services/billing/getway.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const getway = await update(id, req.body);
        if (getway)
            res.respond(constants.OK, getMessage("success.success"), getway);
    } catch (error) {
        return next(error);
    }
};
