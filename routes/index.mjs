import express from "express";
import userRoutes from "./user.routes.mjs";
import authRoutes from "./auth.routes.mjs";

import {
    authenticateJWT,
    authorizeRole,
} from "../app/middlewares/auth.middleware.mjs";
import { handleFileUpload } from "../app/controllers/fileUploader.controller.mjs";

const router = express.Router();

// router.use("/auth", authRoutes({ validate }));
router.use("/auth", authRoutes);
router.use("/admin/users", authenticateJWT, authorizeRole("admin"), userRoutes);

//////////////////////////////////////////
router.post("/upload", handleFileUpload);

export default router;
