import { getMessage } from "../../../../config/i18nConfig.mjs";
import { get as getGetway } from "../../../services/billing/getway.service.mjs";
import { get as getInvoice } from "../../../services/billing/invoice.service.mjs";
import axios from "axios";
import APIError from "../../../../utils/errors.mjs";
import { create } from "../../../services/billing/transaction.service.mjs";
import { justAdmin } from "../../../../utils/justAdmin.mjs";

export const payController = async (req, res, next) => {
    try {
        const userId = justAdmin(req.body.userId, req.user);
        const getwayId = req.body?.getway;
        const invoiceId = req.body?.invoice;

        // Validate required parameters
        if (!getwayId || !invoiceId) {
            throw new APIError({
                message: getMessage("missing_required_parameters"),
                status: 400,
            });
        }

        const [getway, invoice] = await Promise.all([
            getGetway(getwayId),
            getInvoice(invoiceId),
        ]);

        if (!getway || !invoice) {
            throw new APIError({
                message: getMessage("getway_or_invoice_not_found"),
                status: 404,
            });
        }

        const body = {
            merchant_id: getway?.privateCode,
            amount: invoice?.total,
            description: "hamayesh description",
            callback_url: "http://127.0.0.1:8000/api/v1/billing/payment/",
        };

        let response = await axios
            .post(getway?.api?.request?.uri, body)
            .catch((error) => {
                console.error("Payment gateway error:", error.response?.data);
                throw new APIError({
                    message: getMessage("payment_gateway_error"),
                    status: error.response?.status || 500,
                });
            });

        const authorityCode = response.data.data.authority;

        if (response.data.data.code !== 100) {
            throw new APIError({
                message: getMessage("payment_gateway_transaction_failed"),
                status: 400,
            });
        }

        const transactionData = { ...req.body, userId, authorityCode };
        const transaction = await create(transactionData);

        if (!transaction) {
            throw new APIError({
                message: getMessage("transaction_creation_failed"),
                status: 500,
            });
        }

        const redirectUrl = `https://sandbox.zarinpal.com/pg/StartPay/${authorityCode}`;
        res.redirect(redirectUrl);
    } catch (error) {
        next(error);
    }
};
