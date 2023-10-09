import express from "express";
import { createUser } from "../app/controllers/user/create.controller.mjs";
import validationMiddleware from "../app/middlewares/validation.middleware.mjs";
import userValidation from "../app/validations/user.validation.mjs";

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
router.post("/", validationMiddleware(userValidation), createUser);

export default router;
