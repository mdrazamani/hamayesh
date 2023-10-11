import express from "express";
import {
  getRegistrationSchema,
  getLoginSchema,
  getVerifyTokenSchema,
  getForgetPasswordValidation,
  getResetPasswordValidation,
} from "../app/validations/auth.validation.mjs";
import { loginController } from "../app/controllers/auth/login.controller.mjs";
import { registerController } from "../app/controllers/auth/register.controller.mjs";
import {
  authenticateJWT,
  authorizeRole,
} from "../app/middlewares/auth.middleware.mjs";
import { verifyTokenController } from "../app/controllers/auth/verifytoken.controller.mjs";

import {
  forgetPasswordController,
  resetPasswordController,
} from "../app/controllers/auth/forgetPassword.controller.mjs";
import { logoutController } from "../app/controllers/auth/logout.controller.mjs";
import { dynamicValidate } from "../utils/validate.mjs";

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication related routes
 */

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Authentication]
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               password:
 *                 type: string
 *                 description: The user's password
 *               email:
 *                 type: string
 *                 description: The user's email
 *               role:
 *                 type: string
 *                 description: The user's role (optional)
 *     responses:
 *       200:
 *         description: Successfully registered
 */

router.post(
  "/register",
  dynamicValidate(getRegistrationSchema),
  registerController
);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Authentication]
 *     description: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successfully logged in
 */

router.post("/login", dynamicValidate(getLoginSchema), loginController);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Authentication]
 *     description: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successfully logged in
 */

router.post("/logout", authenticateJWT, logoutController);

/**
 * @swagger
 * /verify-token:
 *   post:
 *     tags: [Authentication]
 *     description: Verify a user's token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - api_token
 *             properties:
 *               api_token:
 *                 type: string
 *                 description: The token to verify
 *     responses:
 *       200:
 *         description: Token is valid
 *       403:
 *         description: Token is invalid or expired
 */

router.post(
  "/verify-token",
  authenticateJWT,
  authorizeRole("admin", "user"),
  dynamicValidate(getVerifyTokenSchema),
  verifyTokenController
);

/**
 * @swagger
 * /forget-password:
 *   post:
 *     tags: [Authentication]
 *     description: Request a password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *     responses:
 *       200:
 *         description: Password reset token sent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post(
  "/forget-password",
  dynamicValidate(getForgetPasswordValidation),
  forgetPasswordController
);

/**
 * @swagger
 * /reset-password:
 *   post:
 *     tags: [Authentication]
 *     description: Reset the user password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 description: The reset token
 *               password:
 *                 type: string
 *                 description: The new password
 *               passwordConfirmation:
 *                 type: string
 *                 description: The password Confirmed
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request or invalid token
 *       500:
 *         description: Internal server error
 */

router.post(
  "/reset-password",
  dynamicValidate(getResetPasswordValidation),
  resetPasswordController
);

export default router;
