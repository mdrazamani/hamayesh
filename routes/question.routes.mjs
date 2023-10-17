import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { createController } from "../app/controllers/question/create.controller.mjs";
import { deleteController } from "../app/controllers/question/delete.controller.mjs";
import { indexController } from "../app/controllers/question/index.controller.mjs";
import { showController } from "../app/controllers/question/show.controller.mjs";
import { updateController } from "../app/controllers/question/update.controller.mjs";
import {
    addItemValidationSchema,
    questionValidationSchema,
    updateItemValidationSchema,
} from "../app/validations/question.validation.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";
import {
    addNestedItemController,
    deleteNestedItemController,
    updateNestedItemController,
} from "../app/controllers/question/question.controller.mjs";

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Questions management and retrieval operations
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
 * /api/v1/questions:
 *   post:
 *     tags: [Questions]
 *     summary: Create a new Question
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the question.
 *               description:
 *                 type: string
 *                 description: Detailed description.
 *               items:
 *                 type: array
 *                 items:
 *                   type: object  // Specified that the items are of type 'object'
 *                   properties:
 *                     question:
 *                       type: string
 *                       description: The question content.
 *                     response:
 *                       type: string
 *                       description: The response content.
 *                 description: Can be a single item or an array of items. // Moved description to the correct place
 *             required:
 *               - title
 *               - description
 *               - items
 */

router.post(
    "/",
    authenticateJWT,
    dynamicValidate(questionValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/questions/{id}:
 *   delete:
 *     tags: [Questions]
 *     summary: Delete a Question
 *     description: Delete a Question with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 */

router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/questions:
 *   get:
 *     tags: [Questions]
 *     summary: Retrieve Question
 *     description: Retrieve a list of Question with pagination.
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
 * /api/v1/questions/{id}:
 *   get:
 *     tags: [Questions]
 *     summary: Retrieve a Question
 *     description: Retrieve detailed information of a specific Question.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 */

router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/questions/{id}:
 *   patch:
 *     tags: [Questions]
 *     summary: Create a new Question
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the question.
 *               description:
 *                 type: string
 *                 description: Detailed description.
 *               items:
 *                 type: array
 *                 items:
 *                   type: object  // Specified that the items are of type 'object'
 *                   properties:
 *                     question:
 *                       type: string
 *                       description: The question content.
 *                     response:
 *                       type: string
 *                       description: The response content.
 *                 description: Can be a single item or an array of items. // Moved description to the correct place
 *             required:
 *               - title
 *               - description
 *               - items
 */

router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(questionValidationSchema),
    updateController
);

/**
 * @swagger
 * /api/v1/questions/{id}/items:
 *   post:
 *     tags: [Questions]
 *     summary: Add a nested item to a question
 *     description: Adds a new item to the specified question's items array.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the question to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question content.
 *               response:
 *                 type: string
 *                 description: The response content.
 *             required:
 *               - question
 *               - response
 */
router.post(
    "/:id/items",
    authenticateJWT,
    dynamicValidate(addItemValidationSchema),
    addNestedItemController
);

/**
 * @swagger
 * /api/v1/questions/{id}/items/{itemId}:
 *   patch:
 *     tags: [Questions]
 *     summary: Update an item within a question
 *     description: Updates an existing item in the specified question's items array.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the question to update.
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: The ID of the item to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The updated question content.
 *               response:
 *                 type: string
 *                 description: The updated response content.
 *             required:
 *               - question
 *               - response
 */
router.patch(
    "/:id/items/:itemId",
    authenticateJWT,
    dynamicValidate(updateItemValidationSchema),
    updateNestedItemController
);

/**
 * @swagger
 * /api/v1/questions/{id}/items/{itemId}:
 *   delete:
 *     tags: [Questions]
 *     summary: Delete an item within a question
 *     description: Deletes an existing item from the specified question's items array.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the question.
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: The ID of the item to delete.
 *         schema:
 *           type: string
 */
router.delete("/:id/items/:itemId", deleteNestedItemController);

export default router;
