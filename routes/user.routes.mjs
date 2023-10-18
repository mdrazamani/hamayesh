import express from "express";
import { getRegistrationSchema } from "../app/validations/auth.validation.mjs";
import { dynamicValidate } from "../utils/validate.mjs";
import { createController } from "../app/controllers/user/create.controller.mjs";
import { deleteController } from "../app/controllers/user/delete.controller.mjs";
import { indexController } from "../app/controllers/user/index.controller.mjs";
import { showController } from "../app/controllers/user/show.controller.mjs";
import { updateController } from "../app/controllers/user/update.controller.mjs";
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
 *               - state
 *               - city
 *               - job // 'job' is now a required field
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
 *                  type: string
 *                  description: The name of the user's role
 *               profileImage:
 *                 type: string
 *                 description: The user's profile image (optional)
 *               national_id:
 *                 type: string
 *                 description: The user's national ID
 *               gender:
 *                 type: string
 *                 description: The user's gender
 *               study_field:
 *                 type: string
 *                 description: Field of study
 *               degree:
 *                 type: string
 *                 description: The user's degree
 *               institute:
 *                 type: string
 *                 description: The user's educational institute
 *               state:
 *                 type: string
 *                 description: The user's state
 *               city:
 *                 type: string
 *                 description: The user's city
 *               job:
 *                 type: string
 *                 description: The user's current job (required)
 *               bio:
 *                 type: string
 *                 description: A short bio about the user (optional)
 *               socials:
 *                 type: object // 'socials' is an object containing various social media links
 *                 properties:
 *                   facebook:
 *                     type: string
 *                     description: The user's Facebook profile URL (optional)
 *                   twitter:
 *                     type: string
 *                     description: The user's Twitter profile URL (optional)
 *                   linkedIn:
 *                     type: string
 *                     description: The user's LinkedIn profile URL (optional)
 *                   whatsapp:
 *                     type: string
 *                     description: The user's WhatsApp number (optional)
 *                   telegram:
 *                     type: string
 *                     description: The user's Telegram username (optional)
 *                 description: Social media profiles of the user (optional)
 */

router.post("/", dynamicValidate(updateValidation), createController);

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

router.get("/", indexController);

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
 *               - job // 'job' is now a required field
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
 *                  type: string
 *                  description: The name of the user's role
 *               profileImage:
 *                 type: string
 *                 description: The user's profile image (optional)
 *               national_id:
 *                 type: string
 *                 description: The user's national ID
 *               gender:
 *                 type: string
 *                 description: The user's gender
 *               study_field:
 *                 type: string
 *                 description: Field of study
 *               degree:
 *                 type: string
 *                 description: The user's degree
 *               institute:
 *                 type: string
 *                 description: The user's educational institute
 *               state:
 *                 type: string
 *                 description: The user's state
 *               city:
 *                 type: string
 *                 description: The user's city
 *               job:
 *                 type: string
 *                 description: The user's current job (required)
 *               bio:
 *                 type: string
 *                 description: A short bio about the user (optional)
 *               socials:
 *                 type: object // 'socials' is an object containing various social media links
 *                 properties:
 *                   facebook:
 *                     type: string
 *                     description: The user's Facebook profile URL (optional)
 *                   twitter:
 *                     type: string
 *                     description: The user's Twitter profile URL (optional)
 *                   linkedIn:
 *                     type: string
 *                     description: The user's LinkedIn profile URL (optional)
 *                   whatsapp:
 *                     type: string
 *                     description: The user's WhatsApp number (optional)
 *                   telegram:
 *                     type: string
 *                     description: The user's Telegram username (optional)
 *                 description: Social media profiles of the user (optional)
 */

router.patch("/:id", dynamicValidate(updateValidation), updateController);

export default router;
