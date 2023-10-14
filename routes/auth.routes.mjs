import express from "express";
import {
    getRegistrationSchema,
    getLoginSchema,
    getVerifyTokenSchema,
    getForgetPasswordValidation,
    getResetPasswordValidation,
    checkEmailValidation,
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
import multer from "multer";

import {
    emailVerifiedCheckController,
    emailVerifiedSendController,
} from "../app/controllers/auth/emailVerified.controller.mjs";

// Set up multer to parse multipart/form-data requests
const upload = multer();

// routes/auth.routes.mjs

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication related routes
 * components:
 *   parameters:
 *     AcceptLanguage:
 *       in: header
 *       name: Accept-Language
 *       schema:
 *         type: string
 *         example: fa
 *         default: fa
 *       required: true
 *       description: Client language preference
 *     AuthorizationHeader:
 *       in: header
 *       name: Authorization
 *       schema:
 *         type: string
 *         example: Bearer YOUR_TOKEN
 *         default: Bearer YOUR_TOKEN
 *       required: true
 *       description: Bearer token for API authorization
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Authentication]
 *     description: Register a new user
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - password
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name
 *               lastName:
 *                 type: string
 *                 description: The user's last name
 *               phoneNumber:
 *                 type: string
 *                 description: The user's phone number
 *               password:
 *                 type: string
 *                 description: The user's password
 *               email:
 *                 type: string
 *                 description: The user's email
 *               role:
 *                 type: string
 *                 description: The user's role (optional)
 *               profileImage:
 *                 type: string
 *                 description: The user's profile image (optional)
 */

router.post(
    "/register",
    upload.none(), // multer parses the form data
    dynamicValidate(getRegistrationSchema),
    registerController
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Authentication]
 *     description: Login a user
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 */

router.post(
    "/login",
    upload.none(), // multer parses the form data
    dynamicValidate(getLoginSchema),
    loginController
);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     tags: [Authentication]
 *     description: Logout a user
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 */

router.post("/logout", authenticateJWT, logoutController);

/**
 * @swagger
 * /api/v1/auth/verify-token:
 *   post:
 *     tags: [Authentication]
 *     description: Verify a user's token
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - api_token
 *             properties:
 *               api_token:
 *                 type: string
 *                 description: The token to verify
 */

router.post(
    "/verify-token",
    upload.none(), // multer parses the form data
    authenticateJWT,
    authorizeRole("admin", "user"),
    dynamicValidate(getVerifyTokenSchema),
    verifyTokenController
);

/**
 * @swagger
 * /api/v1/auth/forget-password:
 *   post:
 *     tags: [Authentication]
 *     description: Request a password reset
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 */

router.post(
    "/forget-password",
    upload.none(), // multer parses the form data
    dynamicValidate(getForgetPasswordValidation),
    forgetPasswordController
);

/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     tags: [Authentication]
 *     description: Reset the user password
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 */

router.post(
    "/reset-password",
    upload.none(), // multer parses the form data
    dynamicValidate(getResetPasswordValidation),
    resetPasswordController
);

/**
 * @swagger
 * /api/v1/auth/email-verified-send:
 *   post:
 *     tags: [Authentication]
 *     description: Send email verification
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 */

router.post(
    "/email-verified-send",
    authenticateJWT,
    emailVerifiedSendController
);

/**
 * @swagger
 * /api/v1/auth/email-verified-check:
 *   post:
 *     tags: [Authentication]
 *     description: Check email verification status
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: The email verification token
 */

router.post(
    "/email-verified-check",
    authenticateJWT,
    upload.none(), // multer parses the form data
    dynamicValidate(checkEmailValidation),
    emailVerifiedCheckController
);

export default router;
