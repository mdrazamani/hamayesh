import express from "express";
import {
  registrationSchema,
  loginSchema,
  verifyToeknSchema,
} from "../app/validations/auth.validation.mjs";
import { loginController } from "../app/controllers/Auth/login.controller.mjs";
import { registerController } from "../app/controllers/Auth/register.controller.mjs";
import { validate } from "express-validation";
import {
  authenticateJWT,
  authorizeRole,
} from "../app/middlewares/auth.middleware.mjs";
import { verifyTokenController } from "../app/controllers/Auth/verifytoken.controller.mjs";


const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.post("/register", validate(registrationSchema), registerController);
router.post("/login", validate(loginSchema), loginController);
router.post(
  "/verify-token",
  // authenticateJWT(),
  authenticateJWT,
  authorizeRole("admin", "user"),
  verifyTokenController

);

export default router;
