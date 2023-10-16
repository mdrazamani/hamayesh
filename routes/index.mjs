import express from "express";
import userRoutes from "./user.routes.mjs";
import authRoutes from "./auth.routes.mjs";
import otherRoutes from "./other.routes.mjs";

import {
    authenticateJWT,
    authorizeRole,
} from "../app/middlewares/auth.middleware.mjs";

const router = express.Router();

router.use("/", otherRoutes);
router.use("/auth", authRoutes);
router.use("/admin/users", authenticateJWT, authorizeRole("admin"), userRoutes);

export default router;
