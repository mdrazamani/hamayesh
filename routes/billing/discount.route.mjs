import express from "express";
import { dynamicValidate } from "../../utils/validate.mjs";
import {
    discountValidationSchema,
    discountUpdateValidationSchema,
} from "../../app/validations/billing/discount.validation.mjs";
import { authenticateJWT } from "../../app/middlewares/auth.middleware.mjs";
import { createController } from "../../app/controllers/billing/discount/create.controller.mjs";
import { deleteController } from "../../app/controllers/billing/discount/delete.controller.mjs";
import { indexController } from "../../app/controllers/billing/discount/index.controller.mjs";
import { showController } from "../../app/controllers/billing/discount/show.controller.mjs";
import { updateController } from "../../app/controllers/billing/discount/update.controller.mjs";

/**
 * @swagger
 * tags:
 *   name: Discount
 *   description: Discount management and retrieval operations
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
 * /api/v1/billing/discount:
 *   post:
 *     tags: [Discount]
 *     summary: Create a new Discount
 *     description: Adds a new Discount configuration to the database.
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
 *               - type
 *               - user
 *               - expiresAt
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount of the discount, optional.
 *               percent:
 *                 type: number
 *                 description: The percentage of the discount, optional, between 0 and 100.
 *               type:
 *                 type: string
 *                 enum: [article, freeRegistration]
 *                 description: The type of the discount. It must be one of the predefined types.
 *               rules:
 *                 type: array
 *                 items:
 *                   type: string
 *                   pattern: '^[0-9a-fA-F]{24}$'
 *                   description: A MongoDB ObjectId reference to a pricing rule.
 *                 description: An array of pricing rule ObjectIds, optional.
 *               user:
 *                 type: string
 *                 pattern: '^[0-9a-fA-F]{24}$'
 *                 description: A MongoDB ObjectId reference to a user.
 *               expiresAt:
 *                 type: date
 *                 description: The expiration date of the discount.
 */

router.post(
    "/",
    // authenticateJWT,
    dynamicValidate(discountValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/billing/discount/{id}:
 *   delete:
 *     tags: [Discount]
 *     summary: Delete a Discount
 *     description: Delete a Discount with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Discount ID
 */
router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/billing/discount:
 *   get:
 *     tags: [Discount]
 *     summary: Retrieve Discount
 *     description: Retrieve a list of Discount with pagination.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
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
 * /api/v1/billing/discount/{id}:
 *   get:
 *     tags: [Discount]
 *     summary: Retrieve a Discount
 *     description: Retrieve detailed information of a specific Discount.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Discount id
 */
router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/billing/discount/{id}:
 *   patch:
 *     tags: [Discount]
 *     summary: Update a Discount
 *     description: Update Discount details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Discount ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - user
 *               - expiresAt
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount of the discount, optional.
 *               percent:
 *                 type: number
 *                 description: The percentage of the discount, optional, between 0 and 100.
 *               type:
 *                 type: string
 *                 enum: [article, freeRegistration]
 *                 description: The type of the discount. It must be one of the predefined types.
 *               rules:
 *                 type: array
 *                 items:
 *                   type: string
 *                   pattern: '^[0-9a-fA-F]{24}$'
 *                   description: A MongoDB ObjectId reference to a pricing rule.
 *                 description: An array of pricing rule ObjectIds, optional.
 *               user:
 *                 type: string
 *                 pattern: '^[0-9a-fA-F]{24}$'
 *                 description: A MongoDB ObjectId reference to a user.
 *               expiresAt:
 *                 type: date
 *                 description: The expiration date of the discount.
 */

// router.patch(
//     "/:id",
//     authenticateJWT,
//     dynamicValidate(discountUpdateValidationSchema),
//     updateController
// );

export default router;
