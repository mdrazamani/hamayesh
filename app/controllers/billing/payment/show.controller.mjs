import axios from "axios";
import APIError from "../../../../utils/errors.mjs";
import { updateBillingUser } from "../../../../utils/invoiceCalculator.mjs";
import { get as getGetway } from "../../../services/billing/gateway.service.mjs";
import { get as getInvoice } from "../../../services/billing/invoice.service.mjs";
import {
    getByAuthority,
    update as updateTransaction,
} from "../../../services/billing/transaction.service.mjs";
import {
    checkVerify,
    createVerifyBody,
    processPaymentResponse,
    transId,
} from "../../../../utils/dynamicGetway.mjs";

export const showController = async (req, res, next) => {
    try {
        const { statusCode, tokenCode } = processPaymentResponse(req, res);

        const transaction = await getByAuthority(tokenCode);
        if (!transaction) {
            throw new APIError({
                message: "Transaction not found",
                status: 404,
            });
        }

        const [gateway, invoice] = await Promise.all([
            getGetway(transaction.gateway),
            getInvoice(transaction.invoice),
        ]);

        if (!gateway || !invoice) {
            throw new APIError({
                message: "Getway or Invoice not found",
                status: 404,
            });
        }

        const createBody = {
            privateCode: getway.privateCode,
            tokenCode,
            total: invoice.total,
        };
        const body = createVerifyBody(getway.slug, createBody);

        try {
            const response = await axios.post(gateway.api.verify.uri, body);

            const result = checkVerify(getway?.slug, response);

            if (result) {
                const transCode = transId(getway?.slug, response);

                await updateTransaction(transaction._id, {
                    refId: transCode,
                    status: "completed",
                });

                invoice.paymentStatus = "completed";
                invoice.save();

                const updateResult = await updateBillingUser(
                    invoice._id,
                    invoice.user,
                    invoice.articleNumber
                );

                return res.render(
                    "D:/projects/Hamayesh/back/hamayesh/views/payment/pay",
                    {
                        success: true,
                        transactionId: transCode,
                        lang: "fa",
                        redirectUrl:
                            "http://127.0.0.1:8000/admin/res/" + updateResult,
                    }
                );
            } else {
                // Handle failed verification
                console.error("Verification failed: ", response.data);
                return res.redirect("http://127.0.0.1:8000/admin/false");
            }
        } catch (error) {
            console.error(
                "Error in payment verification: ",
                error.response?.data
            );
            throw new APIError({
                message: "Error in payment verification",
                status: error.response?.status || 500,
            });
        }
    } catch (error) {
        next(error);
    }
};
