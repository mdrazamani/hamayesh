import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import {
    pricingValidationSchema,
    pricingUpdateValidationSchema,
} from "../../app/validations/billing/pricing.validation.mjs";
import { authenticateJWT } from "../../app/middlewares/auth.middleware.mjs";
import { createController } from "../../app/controllers/billing/pricing/create.controller.mjs";
import { deleteController } from "../../app/controllers/billing/pricing/delete.controller.mjs";
import { indexController } from "../../app/controllers/billing/pricing/index.controller.mjs";
import { showController } from "../../app/controllers/billing/pricing/show.controller.mjs";
import { updateController } from "../../app/controllers/billing/pricing/update.controller.mjs";

/**
 * @swagger
 * tags:
 *   name: Pricing
 *   description: Pricing management and retrieval operations
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
 * /api/v1/billing/pricing:
 *   post:
 *     tags: [Pricing]
 *     summary: Create a new pricing
 *     description: Adds a new pricing configuration to the database.
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
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [article]
 *                 description: The type of the pricing. It must be one of the predefined types.
 *               rules:
 *                 type: array
 *                 description: An array of pricing rules.
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the pricing rule.
 *                     description:
 *                       type: string
 *                       description: A description of the pricing rule.
 *                     number:
 *                       type: integer
 *                       description: A unique number identifier for the rule.
 *                     price:
 *                       type: number
 *                       description: The price associated with this rule.
 *                     additionalInfo:
 *                       type: object
 *                       description: Additional information related to the pricing rule.
 *                 nullable: true
 *
 */

router.post(
    "/",
    authenticateJWT,
    dynamicValidate(pricingValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/billing/pricing/{id}:
 *   delete:
 *     tags: [Pricing]
 *     summary: Delete a pricing
 *     description: Delete a pricing with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: pricing ID
 */
router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/billing/pricing:
 *   get:
 *     tags: [Pricing]
 *     summary: Retrieve pricing
 *     description: Retrieve a list of pricing with pagination.
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
 * /api/v1/billing/pricing/{id}:
 *   get:
 *     tags: [Pricing]
 *     summary: Retrieve a pricing
 *     description: Retrieve detailed information of a specific pricing.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: pricing id
 */
router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/billing/pricing/{id}:
 *   patch:
 *     tags: [Pricing]
 *     summary: Update a pricing
 *     description: Update pricing details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: pricing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [article]
 *                 description: The type of the pricing. It must be one of the predefined types.
 *               rules:
 *                 type: array
 *                 description: An array of pricing rules.
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the pricing rule.
 *                     description:
 *                       type: string
 *                       description: A description of the pricing rule.
 *                     number:
 *                       type: integer
 *                       description: A unique number identifier for the rule.
 *                     price:
 *                       type: number
 *                       description: The price associated with this rule.
 *                     additionalInfo:
 *                       type: object
 *                       description: Additional information related to the pricing rule.
 *                 nullable: true
 *
 */

router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(pricingUpdateValidationSchema),
    updateController
);

export default router;
