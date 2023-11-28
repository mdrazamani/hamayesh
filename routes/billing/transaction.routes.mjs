// transaction.routes.mjs
import express from "express";
import { dynamicValidate } from "../../utils/validate.mjs";

import { authenticateJWT } from "../../app/middlewares/auth.middleware.mjs";

// import { transactionValidationSchema } from "../../app/validations/billing/transaction.validation.mjs";
import { deleteController } from "../../app/controllers/billing/transaction/delete.controller.mjs";
import { showController } from "../../app/controllers/billing/transaction/show.controller.mjs";
import { indexController } from "../../app/controllers/billing/transaction/index.controller.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction management and retrieval operations
 */

/**
 * @swagger
 * /api/v1/billing/transactions/{id}:
 *   delete:
 *     tags: [Transaction]
 *     summary: Delete a transaction
 *     description: Delete a transaction with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully.
 */
router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/billing/transactions:
 *   get:
 *     tags: [Transaction]
 *     summary: Retrieve transactions
 *     description: Retrieve a list of transactions with pagination.
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
 *         description: List of transactions.
 */
router.get("/", authenticateJWT, indexController);

/**
 * @swagger
 * /api/v1/billing/transactions/{id}:
 *   get:
 *     tags: [Transaction]
 *     summary: Retrieve a transaction
 *     description: Retrieve detailed information of a specific transaction.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Detailed transaction information.
 */
router.get("/:id", authenticateJWT, showController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - invoiceId
 *         - status
 *       properties:
 *         invoiceId:
 *           type: string
 *           description: Invoice ID associated with the transaction.
 *         status:
 *           type: string
 *           enum: [completed, failed]
 *           default: failed
 */

export default router;
