import express from "express";
import { indexController } from "../../app/controllers/billing/gateway/index.controller.mjs";

const router = express.Router();

router.get("/", indexController);

export default router;
