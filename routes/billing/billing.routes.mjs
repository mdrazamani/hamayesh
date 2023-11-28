// billing.routes.mjs

import express from "express";
import Pricing from "./pricing.routes.mjs";
import Invoice from "./invoice.routes.mjs";
import Transaction from "./transaction.routes.mjs";

// import other billing related routers

const router = express.Router();

router.use("/pricing", Pricing);
router.use("/invoice", Invoice);
router.use("/transactions", Transaction);

// add other billing-related routers here

export default router;
