import express from "express";
import userRoutes from "./user.routes.mjs";
import authRoutes from "./auth.routes.mjs";

const router = express.Router();

// router.use("/auth", authRoutes({ validate }));
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
