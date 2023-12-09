// billing.routes.mjs

import express from "express";
import Pricing from "./pricing.routes.mjs";
import Discount from "./discount.route.mjs";
import Invoice from "./invoice.routes.mjs";
import Transaction from "./transaction.routes.mjs";
import Payment from "./payment.routes.mjs";
import Gateway from "./gateway.routes.mjs";

// import other billing related routers

const router = express.Router();

router.use("/pricing", Pricing);
router.use("/discount", Discount);
router.use("/invoice", Invoice);
router.use("/transactions", Transaction);
router.use("/payment", Payment);
router.use("/gateway", Gateway);

// add other billing-related routers here

export default router;
