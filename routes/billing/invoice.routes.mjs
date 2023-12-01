// invoice.routes.mjs
import express from "express";
import { dynamicValidate } from "../../utils/validate.mjs";

import { authenticateJWT } from "../../app/middlewares/auth.middleware.mjs";

import {
    invoiceValidationSchema,
    applyValidationSchema,
} from "../../app/validations/billing/invoice.validation.mjs";
import { createController } from "../../app/controllers/billing/invoice/create.controller.mjs";
import { deleteController } from "../../app/controllers/billing/invoice/delete.controller.mjs";
import { showController } from "../../app/controllers/billing/invoice/show.controller.mjs";
import { indexController } from "../../app/controllers/billing/invoice/index.controller.mjs";
import { applyDiscountController } from "../../app/controllers/billing/invoice/applyDiscount.controller.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invoice
 *   description: Invoice management and retrieval operations
 */

/**
 * @swagger
 * /api/v1/billing/invoices:
 *   post:
 *     tags: [Invoice]
 *     summary: Create a new invoice
 *     description: Adds a new invoice to the database.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       201:
 *         description: Invoice created successfully.
 */
router.post(
    "/",
    authenticateJWT,
    dynamicValidate(invoiceValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/billing/invoices/{id}:
 *   delete:
 *     tags: [Invoice]
 *     summary: Delete an invoice
 *     description: Delete an invoice with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice deleted successfully.
 */
router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/billing/invoices:
 *   get:
 *     tags: [Invoice]
 *     summary: Retrieve invoices
 *     description: Retrieve a list of invoices with pagination.
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
 *     responses:
 *       200:
 *         description: List of invoices.
 */
// router.get("/", authenticateJWT, indexController);
router.get("/", authenticateJWT, indexController);

/**
 * @swagger
 * /api/v1/billing/invoices/{id}:
 *   get:
 *     tags: [Invoice]
 *     summary: Retrieve an invoice
 *     description: Retrieve detailed information of a specific invoice.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Detailed invoice information.
 */
// router.get("/:id", authenticateJWT, showController);
router.get("/:id", authenticateJWT, showController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       required:
 *         - user
 *         - items
 *         - subtotal
 *         - total
 *       properties:
 *         invoiceNumber:
 *           type: string
 *         user:
 *           type: string
 *           description: User ID associated with the invoice.
 *         items:
 *           type: array
 *           items:
 *             type: string
 *           description: List of item IDs in the invoice.
 *         subtotal:
 *           type: number
 *         discounts:
 *           type: array
 *           items:
 *             type: string
 *           description: List of discount IDs applied to the invoice.
 *         total:
 *           type: number
 *         paymentStatus:
 *           type: string
 *           enum: [pending, completed, failed]
 *           default: pending
 */

router.post(
    "/apply",
    authenticateJWT,
    dynamicValidate(applyValidationSchema),
    applyDiscountController
);

export default router;
