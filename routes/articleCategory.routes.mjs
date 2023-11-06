import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { createController } from "../app/controllers/article/articleCategory/create.controller.mjs";
import { deleteController } from "../app/controllers/article/articleCategory/delete.controller.mjs";
import { indexController } from "../app/controllers/article/articleCategory/index.controller.mjs";
import { showController } from "../app/controllers/article/articleCategory/show.controller.mjs";
import { updateController } from "../app/controllers/article/articleCategory/update.controller.mjs";
import {
    articleCategoryValidationSchema,
    articleUpdateCategoryValidationSchema,
} from "../app/validations/articleCategory.validation.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";

/**
 * @swagger
 * tags:
 *   name: ArticleCategories
 *   description: ArticleCategories management and retrieval operations
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
 * /api/v1/article-categories:
 *   post:
 *     tags: [ArticleCategories]
 *     summary: Create a new ArticleCategory
 *     description: Adds a new article category to the database.
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
 *                 description: The title of the ArticleCategory. It must be unique and between 2 to 100 characters long.
 *               description:
 *                 type: string
 *                 nullable: true
 *                 description: An optional detailed description of the ArticleCategory. This field can be null or contain an empty string.
 *               referees:
 *                 type: array
 *                 items:
 *                   type: string
 *                   pattern: '^[0-9a-fA-F]{24}$'
 *                   description: An array of ObjectIds referring to the users. Each ObjectId must be a string of 24 hexadecimal characters.
 *                 nullable: true
 *                 description: Optional. An array of referees, if applicable. It can be an empty array.
 */
router.post(
    "/",
    authenticateJWT,
    dynamicValidate(articleCategoryValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/article-Categories/{id}:
 *   delete:
 *     tags: [ArticleCategories]
 *     summary: Delete a ArticleCategory
 *     description: Delete a ArticleCategory with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ArticleCategory ID
 */

router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/article-Categories:
 *   get:
 *     tags: [ArticleCategories]
 *     summary: Retrieve ArticleCategory
 *     description: Retrieve a list of ArticleCategory with pagination.
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
 * /api/v1/article-Categories/{id}:
 *   get:
 *     tags: [ArticleCategories]
 *     summary: Retrieve a ArticleCategory
 *     description: Retrieve detailed information of a specific ArticleCategory.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ArticleCategory ID
 */

router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/article-Categories/{id}:
 *   patch:
 *     tags: [ArticleCategories]
 *     summary: Update a ArticleCategory
 *     description: Update ArticleCategory details.
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
 *                 description: The title of the ArticleCategory. It must be unique and between 2 to 100 characters long.
 *               description:
 *                 type: string
 *                 nullable: true
 *                 description: An optional detailed description of the ArticleCategory. This field can be null or contain an empty string.
 *               referees:
 *                 type: array
 *                 items:
 *                   type: string
 *                   pattern: '^[0-9a-fA-F]{24}$'
 *                   description: An array of ObjectIds referring to the users. Each ObjectId must be a string of 24 hexadecimal characters.
 *                 nullable: true
 *                 description: Optional. An array of referees, if applicable. It can be an empty array.
 */

router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(articleUpdateCategoryValidationSchema),
    updateController
);

export default router;
