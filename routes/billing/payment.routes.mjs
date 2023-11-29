import express from "express";
import { dynamicValidate } from "../../utils/validate.mjs";
import { authenticateJWT } from "../../app/middlewares/auth.middleware.mjs";
import {
    invoiceValidationSchema,
    applyValidationSchema,
} from "../../app/validations/billing/invoice.validation.mjs";
import { showController } from "../../app/controllers/billing/payment/show.controller.mjs";
import { payController } from "../../app/controllers/billing/payment/pay.controller.mjs";

const router = express.Router();

router.post(
    "/",
    // authenticateJWT,
    // dynamicValidate(invoiceValidationSchema),
    payController
);

// router.delete("/:id", authenticateJWT, deleteController);
router.get("/", showController);
// router.get("/:id", showController);

export default router;
