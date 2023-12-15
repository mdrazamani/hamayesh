import express from "express";
import { dynamicValidate } from "../../utils/validate.mjs";
import { authenticateJWT } from "../../app/middlewares/auth.middleware.mjs";
import {
    paymentValidationSchema,
    tokenValidationSchema,
} from "../../app/validations/billing/payment.validation.mjs";
// import { showController } from "../../app/controllers/billing/payment/show.controller.mjs";
import { payController } from "../../app/controllers/billing/payment/pay.controller.mjs";
import { verifyController } from "../../app/controllers/billing/payment/verify.controller.mjs";

const router = express.Router();

router.post(
    "/",
    authenticateJWT,
    dynamicValidate(paymentValidationSchema),
    payController
);

// router.get("/", showController);
router.post(
    "/verify",
    authenticateJWT,
    dynamicValidate(tokenValidationSchema),
    verifyController
);

export default router;
