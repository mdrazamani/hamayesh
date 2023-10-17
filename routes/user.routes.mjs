import express from "express";
import { getRegistrationSchema } from "../app/validations/auth.validation.mjs";
import { dynamicValidate } from "../utils/validate.mjs";
import { createController } from "../app/controllers/user/create.controller.mjs";
import { deleteController } from "../app/controllers/user/delete.controller.mjs";
import { indexController } from "../app/controllers/user/index.controller.mjs";
import { showController } from "../app/controllers/user/show.controller.mjs";
import { updateController } from "../app/controllers/user/update.controller.mjs";
import { paginationValidation } from "../app/validations/pagination.validation.mjs";
import { updateValidation } from "../app/validations/user.validation.mjs";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: users related routes
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
 * /api/v1/admin/users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
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
 *               - national_id
 *               - gender
 *               - study_field
 *               - degree
 *               - institute
 *               - country
 *               - state
 *               - city
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
 *               national_id:
 *                 type: string
 *                 description: The user's national ID (now required)
 *               gender:
 *                 type: string
 *                 description: The user's gender (now required)
 *               study_field:
 *                 type: string
 *                 description: Field of study (now required)
 *               degree:
 *                 type: string
 *                 description: The user's degree (now required)
 *               institute:
 *                 type: string
 *                 description: The user's educational institute (now required)
 *               country:
 *                 type: string
 *                 description: The user's country (now required)
 *               state:
 *                 type: string
 *                 description: The user's state (now required)
 *               city:
 *                 type: string
 *                 description: The user's city (now required)
 */

router.post("/", dynamicValidate(getRegistrationSchema), createController);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     description: Delete a user with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 */

router.delete("/:id", deleteController);

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve users
 *     description: Retrieve a list of users with pagination.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of items per page
 */

router.get("/", /*dynamicValidate(paginationValidation),*/ indexController);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a user
 *     description: Retrieve detailed information of a specific user.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 */

router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update a user
 *     description: Update user details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *               - national_id
 *               - gender
 *               - study_field
 *               - degree
 *               - institute
 *               - state
 *               - city
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
 *               profileImage:
 *                 type: string
 *                 description: The user's profile image (optional)
 *               national_id:
 *                 type: string
 *                 description: The user's national ID (now required)
 *               gender:
 *                 type: string
 *                 description: The user's gender (now required)
 *               study_field:
 *                 type: string
 *                 description: Field of study (now required)
 *               degree:
 *                 type: string
 *                 description: The user's degree (now required)
 *               institute:
 *                 type: string
 *                 description: The user's educational institute (now required)
 *               state:
 *                 type: string
 *                 description: The user's state (now required)
 *               city:
 *                 type: string
 *                 description: The user's city (now required)
 */

router.patch("/:id", dynamicValidate(updateValidation), updateController);

export default router;
