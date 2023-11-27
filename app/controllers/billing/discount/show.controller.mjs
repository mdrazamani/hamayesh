import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { get } from "../../../services/billing/discount.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const discount = await get(id);
        if (discount)
            res.respond(constants.OK, getMessage("success.success"), discount);
    } catch (error) {
        return next(error);
    }
};
