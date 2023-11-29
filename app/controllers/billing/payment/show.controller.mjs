import { updateBillingUser } from "../../../../utils/invoiceCalculator.mjs";
import { get as getGetway } from "../../../services/billing/getway.service.mjs";
import { get as getInvoice } from "../../../services/billing/invoice.service.mjs";
import { getByAuthority } from "../../../services/billing/transaction.service.mjs";
// import { get as getUsers } from "../../../services/user.service.mjs";

export const showController = async (req, res, next) => {
    try {
        // if (req.user) req.body.userId = req.user?._id;

        const { Authority, Status } = req.query;

        if (Status !== "OK") res.redirect("http://127.0.0.1:8000/admin/false");

        const transaction = await getByAuthority(Authority);
        const getway = await getGetway(transaction?.getway);
        const invoice = await getInvoice(transaction?.invoice);
        // const user = await getUsers(invoice?.user);

        const url = getway?.verify?.uri;
        const body = getway?.api?.verify?.body;

        body.merchant_id = getway?.privateCode;
        body.amount = invoice?.total;
        body.authority = Authority;

        let response = "";
        let isOk = false;
        try {
            response = await axios.post(url, body);
            if (response && (response?.code == 100 || response?.code == 101)) {
                transaction.refId = response?.ref_id;
                transaction.status = "completed";
                transaction.save();

                invoice.paymentStatus = "completed";
                invoice.save();

                isOk = updateBillingUser(
                    invoice?._id,
                    invoice?.user,
                    invoice?.articleNumber
                );
            }

            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error.response.data);
        }

        res.render("D:/projects/Hamayesh/back/hamayesh/views/payment/pay", {
            success: true,
            transactionId: "123654",
            lang: "fa",
            redirectUrl: "http://127.0.0.1:8000/admin/res/" + isOk,
        });
    } catch (error) {
        next(error);
    }
};
