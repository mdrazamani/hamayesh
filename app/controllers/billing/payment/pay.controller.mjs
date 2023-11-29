import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { get as getGetway } from "../../../services/billing/getway.service.mjs";
import { get as getInvoice } from "../../../services/billing/invoice.service.mjs";
import axios from "axios";
import APIError from "../../../../utils/errors.mjs";

export const payController = async (req, res, next) => {
    try {
        if (!req.body?.userId) if (req.user) req.body.userId = req.user?._id;

        let response = "";
        if (!req.body.user) {
            throw new APIError({
                message: getMessage("user_not_found"),
                status: 404,
            });
        }

        const getway = await getGetway(req.body?.getway);
        const invoice = await getInvoice(req.body?.invoice);

        const url = getway?.api?.request?.uri;
        const body = getway?.api?.request?.body;

        body.merchant_id = getway?.privateCode;
        body.amount = invoice?.total;
        body.description = "hamayesh description";
        body.callback_url = "http://127.0.0.1:8000/api/v1/billing/payment/";

        try {
            response = await axios.post(url, body);
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error.response.data);
        }

        const data = req.body;
        if (data && response) {
            data.authorityCode = response.authority;
        }
        const transaction = await create(data);

        const redirectUrl = `https://www.zarinpal.com/pg/StartPay/${response.authority}`;
        if (transaction) res.redirect(redirectUrl);

        // if (pay) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
