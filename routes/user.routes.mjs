import express from "express";
import { createUserController } from "../app/controllers/user/create.controller.mjs";
// import { userValidation } from "../app/validations/user.validation.mjs";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: users related routes
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags: [Users]
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/", createUserController);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags: [Users]
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/", createUserController);

export default router;
