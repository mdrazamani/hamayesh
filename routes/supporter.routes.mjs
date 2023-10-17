import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { createController } from "../app/controllers/supporter/create.controller.mjs";
import { deleteController } from "../app/controllers/supporter/delete.controller.mjs";
import { indexController } from "../app/controllers/supporter/index.controller.mjs";
import { showController } from "../app/controllers/supporter/show.controller.mjs";
import { updateController } from "../app/controllers/supporter/update.controller.mjs";
import { supporterValidationSchema } from "../app/validations/supporter.validation.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";

/**
 * @swagger
 * tags:
 *   name: Supporters
 *   description: Supporter management and retrieval operations
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
 * /api/v1/supporters:
 *   post:
 *     tags: [Supporters]
 *     summary: Create a new supporter
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
 *               - name
 *               - logo
 *               - supportType
 *               - link
 *             properties:
 *         name:
 *           type: string
 *           description: The name of the supporter.
 *         logo:
 *           type: string
 *           description: The logo URL of the supporter.
 *         supportType:
 *           type: string
 *           description: Type of support provided by the supporter, either Financial or Academic.
 *         link:
 *           type: string
 *           description: A link associated with the supporter (optional).
 */
router.post(
    "/",
    authenticateJWT,
    dynamicValidate(supporterValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/supporters/{id}:
 *   delete:
 *     tags: [Supporters]
 *     summary: Delete a supporter
 *     description: Delete a supporter with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: supporter ID
 */

router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/supporters:
 *   get:
 *     tags: [Supporters]
 *     summary: Retrieve supporters
 *     description: Retrieve a list of supporters with pagination.
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
 * /api/v1/supporters/{id}:
 *   get:
 *     tags: [Supporters]
 *     summary: Retrieve a supporter
 *     description: Retrieve detailed information of a specific supporter.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: supporter ID
 */

router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/supporters/{id}:
 *   patch:
 *     tags: [Supporters]
 *     summary: Update a supporter
 *     description: Update supporter details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supporter ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *         name:
 *           type: string
 *           description: The name of the supporter.
 *         logo:
 *           type: string
 *           description: The logo URL of the supporter.
 *         supportType:
 *           type: string
 *           description: Type of support provided by the supporter, either Financial or Academic.
 *         link:
 *           type: string
 *           description: A link associated with the supporter (optional).
 */

router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(supporterValidationSchema),
    updateController
);

export default router;
