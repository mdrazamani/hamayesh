import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { get } from "../../../services/billing/getway.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const getway = await get(id);
        if (getway)
            res.respond(constants.OK, getMessage("success.success"), getway);
    } catch (error) {
        return next(error);
    }
};
