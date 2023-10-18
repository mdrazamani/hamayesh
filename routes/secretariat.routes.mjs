// secretariatRoutes.mjs

import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import {
    secretariatUpdateValidation,
    secretariatValidation,
} from "../app/validations/secretariat.validation.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";
import { createSecretariatController } from "../app/controllers/secretariat/create.controller.mjs";
import { deleteSecretariatController } from "../app/controllers/secretariat/delete.controller.mjs";
import { getAllSecretariatsController } from "../app/controllers/secretariat/index.controller.mjs";
import { getSecretariatController } from "../app/controllers/secretariat/show.controller.mjs";
import { updateSecretariatController } from "../app/controllers/secretariat/update.controller.mjs";
// Adjust the import based on your file structure

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Secretariats
 *   description: Secretariat management and retrieval operations
 * components:
 *   parameters:
 *     AcceptLanguage:
 *       in: header
 *       name: Accept-Language
 *       schema:
 *         type: string
 *         example: en
 *         default: en
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

/**
 * @swagger
 * /api/v1/secretariats:
 *   post:
 *     tags: [Secretariats]
 *     summary: Create a new secretariat
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - boss
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the secretariat.
 *               description:
 *                 type: string
 *                 description: A detailed description of the secretariat.
 *               boss:
 *                 type: string
 *                 description: The boss of the secretariat.
 *               type:
 *                 type: string
 *                 description: The type of secretariat.
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs of the users related to the secretariat.
 */
router.post(
    "/",
    authenticateJWT,
    dynamicValidate(secretariatValidation),
    createSecretariatController
);

/**
 * @swagger
 * /api/v1/secretariats/{id}:
 *   delete:
 *     tags: [Secretariats]
 *     summary: Delete a secretariat
 *     description: Delete a secretariat with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Secretariat ID
 */
router.delete("/:id", authenticateJWT, deleteSecretariatController);

/**
 * @swagger
 * /api/v1/secretariats:
 *   get:
 *     tags: [Secretariats]
 *     summary: Retrieve secretariats
 *     description: Retrieve a list of secretariats with pagination.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
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
router.get("/", getAllSecretariatsController);

/**
 * @swagger
 * /api/v1/secretariats/{id}:
 *   get:
 *     tags: [Secretariats]
 *     summary: Retrieve a secretariat
 *     description: Retrieve detailed information of a specific secretariat.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Secretariat ID
 */
router.get("/:id", getSecretariatController);

/**
 * @swagger
 * /api/v1/secretariats/{id}:
 *   patch:
 *     tags: [Secretariats]
 *     summary: Update a secretariat
 *     description: Update secretariat details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Secretariat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the secretariat.
 *               description:
 *                 type: string
 *                 description: A detailed description of the secretariat.
 *               boss:
 *                 type: string
 *                 description: The boss of the secretariat.
 *               type:
 *                 type: string
 *                 description: The type of secretariat.
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs of the users related to the secretariat.
 */
router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(secretariatUpdateValidation),
    updateSecretariatController
);

export default router;
