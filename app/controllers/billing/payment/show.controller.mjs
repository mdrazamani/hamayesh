import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { create } from "../../../services/billing/invoice.service.mjs";

export const showController = async (req, res, next) => {
    try {
        // const paymentId = req.params.id;

        // const payment = await findById(paymentId);
        // if (payment) {
        res.render("../payment/pay", {
            success: true,
            transactionId: "123654",
        });
        // } else {
        //     res.status(404).render("error", { message: "Payment not found" });
        // }
    } catch (error) {
        next(error);
    }
};
