import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { createController } from "../app/controllers/news/NewsTag/create.controller.mjs";
import { deleteController } from "../app/controllers/news/NewsTag/delete.controller.mjs";
import { indexController } from "../app/controllers/news/NewsTag/index.controller.mjs";
import { showController } from "../app/controllers/news/NewsTag/show.controller.mjs";
import { updateController } from "../app/controllers/news/NewsTag/update.controller.mjs";
import { newsTagValidationSchema } from "../app/validations/newsTag.validation.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";

/**
 * @swagger
 * tags:
 *   name: NewsTags
 *   description: NewsTag management and retrieval operations
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

const router = express.Router();

/**
 * @swagger
 * /api/v1/news-tags:
 *   post:
 *     tags: [NewsTags]
 *     summary: Create a new NewsTag
 *     description: This endpoint creates a new NewsTag with the specified title and slug.
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
 *               - slug
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the NewsTag.
 *                 minLength: 1
 *                 maxLength: 100
 *                 example: "Environment"
 *               slug:
 *                 type: string
 *                 description: URL-friendly unique identifier.
 *                 minLength: 1
 *                 maxLength: 200
 *                 pattern: '/^[a-zA-Z0-9_-]+$/'
 *                 example: "environment-news"
 */

router.post(
    "/",
    authenticateJWT,
    dynamicValidate(newsTagValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/news-tags/{id}:
 *   delete:
 *     tags: [NewsTags]
 *     summary: Delete a NewsTag
 *     description: Delete a NewsTag with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NewsTag ID
 */
router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/news-tags:
 *   get:
 *     tags: [NewsTags]
 *     summary: Retrieve NewsTag
 *     description: Retrieve a list of NewsTag with pagination.
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
router.get("/", indexController);

/**
 * @swagger
 * /api/v1/news-tags/{id}:
 *   get:
 *     tags: [NewsTags]
 *     summary: Retrieve a NewsTag
 *     description: Retrieve detailed information of a specific NewsTag.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NewsTag id
 */
router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/news-tags/{id}:
 *   patch:
 *     tags: [NewsTags]
 *     summary: Update a NewsTag
 *     description: Update NewsTag details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NewsTag ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - slug
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the NewsTag.
 *                 minLength: 1
 *                 maxLength: 100
 *                 example: "Environment"
 *               slug:
 *                 type: string
 *                 description: URL-friendly unique identifier.
 *                 minLength: 1
 *                 maxLength: 200
 *                 pattern: '/^[a-zA-Z0-9_-]+$/'
 *                 example: "environment-news"
 */
router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(newsTagValidationSchema),
    updateController
);

export default router;
