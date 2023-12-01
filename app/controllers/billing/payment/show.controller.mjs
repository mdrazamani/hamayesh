import axios from "axios";
import APIError from "../../../../utils/errors.mjs";
import { updateBillingUser } from "../../../../utils/invoiceCalculator.mjs";
import { get as getGetway } from "../../../services/billing/getway.service.mjs";
import { get as getInvoice } from "../../../services/billing/invoice.service.mjs";
import {
    getByAuthority,
    update as updateTransaction,
} from "../../../services/billing/transaction.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { Authority, Status } = req.query;

        if (Status !== "OK") {
            return res.redirect("http://127.0.0.1:8000/admin/false");
        }

        const transaction = await getByAuthority(Authority);
        if (!transaction) {
            throw new APIError({
                message: "Transaction not found",
                status: 404,
            });
        }

        const [getway, invoice] = await Promise.all([
            getGetway(transaction.getway),
            getInvoice(transaction.invoice),
        ]);

        if (!getway || !invoice) {
            throw new APIError({
                message: "Getway or Invoice not found",
                status: 404,
            });
        }

        const body = {
            merchant_id: getway.privateCode,
            amount: invoice.total,
            authority: Authority,
        };

        try {
            const response = await axios.post(getway.api.verify.uri, body);

            console.log("response: ", response.data);

            if (response.data.data.code === -51) {
                throw new APIError({
                    message: "Payment failed",
                    status: 401,
                });
            }

            if (
                response.data.data.code === 100 ||
                response.data.data.code === 101
            ) {
                await updateTransaction(transaction._id, {
                    refId: response.data.data.ref_id,
                    status: "completed",
                });

                await invoice.updateOne({ paymentStatus: "completed" });
                const updateResult = updateBillingUser(
                    invoice._id,
                    invoice.user,
                    invoice.articleNumber
                );

                return res.render(
                    "D:/projects/Hamayesh/back/hamayesh/views/payment/pay",
                    {
                        success: true,
                        transactionId: response.data.data.ref_id,
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
