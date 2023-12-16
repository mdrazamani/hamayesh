import { getByRefId } from "../app/services/billing/transaction.service.mjs";

export const createBody = (slug, data) => {
    if (slug === "pay") {
        return {
            api: data.privateCode,
            amount: data.total,
            redirect: data.redirect,
            description: data.description,
            factorNumber: data.factorNumber || 0,
        };
    } else if (slug === "zarinpal") {
        return {
            merchant_id: data.privateCode,
            amount: data.total,
            description: data.description,
            callback_url: data.redirect,
        };
    }
};

export const createRedirect = (slug, response, reqBody, userId) => {
    if (slug === "pay") {
        const status = response.data.status;
        const token = response.data.token;

        if (status !== 1) {
            throw new APIError({
                message: getMessage("payment_gateway_transaction_failed"),
                status: 400,
            });
        }

        const authorityCode = token;
        return {
            transactionData: { ...reqBody, userId, authorityCode },
            redirectUrl: `https://pay.ir/pg/${token}`,
        };
    } else if (slug === "zarinpal") {
        const authorityCode = response.data.data.authority;
        const code = response.data.data.code;

        if (code !== 100) {
            throw new APIError({
                message: getMessage("payment_gateway_transaction_failed"),
                status: 400,
            });
        }

        return {
            transactionData: { ...reqBody, userId, authorityCode },
            redirectUrl: `https://sandbox.zarinpal.com/pg/StartPay/${authorityCode}`,
        };
    }
};

export const processPaymentResponse = (req, res) => {
    const { Authority, Status, token, status } = req.query;

    if (Authority && Status) {
        if (Status !== "OK") {
            return res.redirect("http://127.0.0.1:8000/admin/false");
        }
        return { statusCode: Status, tokenCode: Authority };
    } else if (token && status) {
        if (status !== "1") {
            return res.redirect("http://127.0.0.1:8000/admin/false");
        }
        return { statusCode: status, tokenCode: token };
    } else {
        return res.redirect("http://127.0.0.1:8000/admin/error");
    }
};

export const createVerifyBody = (slug, data) => {
    if (slug === "pay") {
        return {
            api: data.privateCode,
            token: data.tokenCode,
        };
    } else if (slug === "zarinpal") {
        return {
            merchant_id: data.privateCode,
            amount: data.total,
            authority: data.tokenCode,
        };
    }
    return false;
};

export const checkVerify = async (slug, response) => {
    if (slug === "zarinpal") {
        const code = response.data.data.code;
        if (code !== 100 && code !== 101) return false;
        if (code == 100) return true;
        if (code == 101) return false;
    } else if (slug === "pay") {
        const status = response.data.status;
        if (status !== 1) return false;
        const transaction = await getByRefId(response.data.transId);
        if (
            transaction &&
            transaction._id &&
            transaction.status !== "pending"
        ) {
            throw new APIError({
                message: "Payment failed",
                status: 401,
            });
        }
        if (status == 1) return true;
    } else {
        throw new APIError({
            message: "getway not found",
            status: 401,
        });
    }

    return false;
};

export const transId = (slug, response) => {
    if (slug === "zarinpal") {
        return response.data.data.ref_id;
    } else if (slug === "pay") {
        return response.data.transId;
    }
    return false;
};
