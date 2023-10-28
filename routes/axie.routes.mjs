import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { createController } from "../app/controllers/axie/create.controller.mjs";
import { deleteController } from "../app/controllers/axie/delete.controller.mjs";
import { indexController } from "../app/controllers/axie/index.controller.mjs";
import { showController } from "../app/controllers/axie/show.controller.mjs";
import { updateController } from "../app/controllers/axie/update.controller.mjs";
import { axieValidationSchema } from "../app/validations/axie.validation.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";
import { indexOrderedController } from "../app/controllers/axie/indexOrdered.controller.mjs";

/**
 * @swagger
 * tags:
 *   name: Axies
 *   description: Axies management and retrieval operations
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
 * /api/v1/axies:
 *   post:
 *     tags: [Axies]
 *     summary: Create a new Axie
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: The title of the Axie.
 *               description:
 *                 type: string
 *                 description: An optional detailed description of the Axie.
 *               parent:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 pattern: '^[0-9a-fA-F]{24}$'
 *                 description: The ObjectId of the parent Axie, if one exists.
 *               level:
 *                 type: integer
 *                 minimum: 1
 *                 default: 1
 *                 description: The level of the Axie, defaults to 1.
 */
router.post(
    "/",
    authenticateJWT,
    dynamicValidate(axieValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/axies/ordered:
 *   get:
 *     tags: [Axies]
 *     summary: Retrieve Axie
 *     description: Retrieve a list of Axie with pagination.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: items_per_page
 *         schema:
 *           type: integer
 *         description: Number of items per page
 */

router.get("/ordered", indexOrderedController);

/**
 * @swagger
 * /api/v1/axies/{id}:
 *   delete:
 *     tags: [Axies]
 *     summary: Delete a Axie
 *     description: Delete a Axie with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Axie ID
 */

router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/axies:
 *   get:
 *     tags: [Axies]
 *     summary: Retrieve Axie
 *     description: Retrieve a list of Axie with pagination.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: items_per_page
 *         schema:
 *           type: integer
 *         description: Number of items per page
 */

router.get("/", indexController);

/**
 * @swagger
 * /api/v1/axies/{id}:
 *   get:
 *     tags: [Axies]
 *     summary: Retrieve a Axie
 *     description: Retrieve detailed information of a specific Axie.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Axie ID
 */

router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/axies/{id}:
 *   patch:
 *     tags: [Axies]
 *     summary: Update a Axie
 *     description: Update Axie details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: The title of the Axie.
 *               description:
 *                 type: string
 *                 description: An optional detailed description of the Axie.
 *               parent:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 pattern: '^[0-9a-fA-F]{24}$'
 *                 description: The ObjectId of the parent Axie, if one exists.
 *               level:
 *                 type: integer
 *                 minimum: 1
 *                 default: 1
 *                 description: The level of the Axie, defaults to 1.
 */

router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(axieValidationSchema),
    updateController
);

export default router;
