import { getMessage } from "../../../../config/i18nConfig.mjs";
import { get as getGetway } from "../../../services/billing/gateway.service.mjs";
import { get as getInvoice } from "../../../services/billing/invoice.service.mjs";
import axios from "axios";
import APIError from "../../../../utils/errors.mjs";
import { create } from "../../../services/billing/transaction.service.mjs";
import { justAdmin } from "../../../../utils/justAdmin.mjs";
import {
    createBody,
    createRedirect,
} from "../../../../utils/dynamicGetway.mjs";

export const payController = async (req, res, next) => {
    try {
        const userId = justAdmin(req.body.userId, req.user);
        const gatewayId = req.body?.gateway;
        const invoiceId = req.body?.invoice;

        // Validate required parameters
        if (!gatewayId || !invoiceId) {
            throw new APIError({
                message: getMessage("missing_required_parameters"),
                status: 400,
            });
        }

        const [gateway, invoice] = await Promise.all([
            getGetway(gatewayId),
            getInvoice(invoiceId),
        ]);

        if (!gateway || !invoice) {
            throw new APIError({
                message: getMessage("gateway_or_invoice_not_found"),
                status: 404,
            });
        }

        if (invoice?.paymentStatus && invoice?.paymentStatus === "completed") {
            throw new APIError({
                message: getMessage("The_invoice_has_already_been_paid"),
                status: 401,
            });
        }

        const createBodyData = {
            privateCode: gateway.privateCode,
            total: invoice.total + 150000,
            redirect: "http://127.0.0.1:8000/api/v1/billing/payment/",
            description: "hamayesh description",
            factorNumber: invoice.invoiceNumber,
        };

        const body = createBody(gateway?.slug, createBodyData);

        console.log("body :", body);

        let response = await axios
            .post(gateway?.api?.request?.uri, body)
            .catch((error) => {
                console.error("Payment gateway error:", error.response?.data);
                throw new APIError({
                    message: getMessage("payment_gateway_error"),
                    status: error.response?.status || 500,
                });
            });

        // console.log(response?.data);

        const { transactionData, redirectUrl } = createRedirect(
            gateway?.slug,
            response,
            req.body,
            userId
        );

        const transaction = await create(transactionData);
        if (!transaction) {
            throw new APIError({
                message: getMessage("transaction_creation_failed"),
                status: 500,
            });
        }

        // res.redirect(redirectUrl);

        if (response?.data)
            res.respond(constants.OK, getMessage("success.success"), {
                redirectUrl,
            });
    } catch (error) {
        next(error);
    }
};
