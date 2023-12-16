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
    transId,
} from "../../../../utils/dynamicGetway.mjs";
import { loadLanguageSetting } from "../../../../config/readLang.mjs";
import constants from "../../../../utils/constants.mjs";
import { getMessage } from "../../../../config/i18nConfig.mjs";

export const verifyController = async (req, res, next) => {
    try {
        const { token } = req.body;

        const transaction = await getByAuthority(token);
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

        if (invoice?.paymentStatus && invoice?.paymentStatus === "completed") {
            throw new APIError({
                message: getMessage("The_invoice_has_already_been_paid"),
                status: 401,
            });
        }

        let lang = loadLanguageSetting();

        const createBody = {
            privateCode: gateway.privateCode,
            tokenCode: token,
            total: invoice.total,
        };
        const body = createVerifyBody(gateway.slug, createBody);

        try {
            const response = await axios.post(gateway.api.verify.uri, body);
            const result =
                (await checkVerify(gateway?.slug, response)) || false;
            const transCode = transId(gateway?.slug, response) || null;

            if (result) {
                await updateTransaction(transaction._id, {
                    refId: transCode,
                    status: "completed",
                });
                invoice.paymentStatus = "completed";
                invoice.save();

                await updateBillingUser(
                    invoice._id,
                    invoice.user,
                    invoice.articleNumber
                );

                res.respond(constants.OK, getMessage("success.success"), {
                    status: true,
                    transactionId: transCode,
                    lang,
                });
            } else {
                await updateTransaction(transaction._id, {
                    refId: transCode,
                    status: "failed",
                });
                invoice.paymentStatus = "failed";
                invoice.save();

                res.respond(constants.OK, getMessage("success.success"), {
                    status: false,
                    transactionId: transCode,
                    lang,
                });
            }
        } catch (error) {
            await updateTransaction(transaction._id, {
                status: "failed",
            });
            invoice.paymentStatus = "failed";
            invoice.save();

            res.respond(constants.OK, getMessage("success.success"), {
                status: false,
                transactionId: null,
                lang,
            });
        }
    } catch (error) {
        next(error);
    }
};
