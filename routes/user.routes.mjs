import express from "express";
import { createUserController } from "../app/controllers/user/create.controller.mjs";
// import { userValidation } from "../app/validations/user.validation.mjs";

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
router.get("/", createUserController);

export default router;
