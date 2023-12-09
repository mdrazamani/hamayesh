import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { createController } from "../app/controllers/news/newsCategory/create.controller.mjs";
import { deleteController } from "../app/controllers/news/newsCategory/delete.controller.mjs";
import { indexController } from "../app/controllers/news/newsCategory/index.controller.mjs";
import { showController } from "../app/controllers/news/newsCategory/show.controller.mjs";
import { updateController } from "../app/controllers/news/newsCategory/update.controller.mjs";
import { indexOrderedController } from "../app/controllers/news/newsCategory/indexOrdered.controller.mjs";
import { newsCategoryValidationSchema } from "../app/validations/newsCategory.validation.mjs";
import {
    authenticateJWT,
    authorizeRole,
} from "../app/middlewares/auth.middleware.mjs";

/**
 * @swagger
 * tags:
 *   name: NewsCategories
 *   description: NewsCategory management and retrieval operations
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
 * /api/v1/news-categories:
 *   post:
 *     tags:
 *       - NewsCategories
 *     summary: Create a new news category
 *     description: Adds a new news category to the database
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
 *                 description: Title of the news category.
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: "International Politics"
 *               description:
 *                 type: string
 *                 description: A brief description or summary of the news category.
 *                 example: "Updates and analysis on global political events."
 *               slug:
 *                 type: string
 *                 pattern: '/^[a-z0-9]+(?:-[a-z0-9]+)*$/'
 *                 description: URL-friendly string identifier.
 *                 example: "international-politics"
 *               image:
 *                 type: string
 *                 description: URL of the image representing the news category content.
 *                 format: uri
 *                 example: "http://example.com/image.jpg"
 *               parent:
 *                 type: string
 *                 description: The unique identifier for the parent category, if any.
 *                 format: uuid
 *                 nullable: true
 *                 example: null
 *               level:
 *                 type: integer
 *                 minimum: 1
 *                 description: The level of the category in the hierarchy, if applicable.
 *                 example: 1
 */

router.post(
    "/",
    authenticateJWT,
    authorizeRole({
        admin: "", // Full access
        executive: "", // Full access
    }),
    dynamicValidate(newsCategoryValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/news-categories/ordered:
 *   get:
 *     tags: [NewsCategories]
 *     summary: Retrieve NewsCategory
 *     description: Retrieve a list of NewsCategory with pagination.
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
 * /api/v1/news-categories/{id}:
 *   delete:
 *     tags: [NewsCategories]
 *     summary: Delete a NewsCategory
 *     description: Delete a NewsCategory with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NewsCategory ID
 */
router.delete(
    "/:id",
    authenticateJWT,
    authorizeRole({
        admin: "", // Full access
        executive: "", // Full access
    }),
    deleteController
);

/**
 * @swagger
 * /api/v1/news-categories:
 *   get:
 *     tags: [NewsCategories]
 *     summary: Retrieve NewsCategory
 *     description: Retrieve a list of NewsCategory with pagination.
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
 * /api/v1/news-categories/{id}:
 *   get:
 *     tags: [NewsCategories]
 *     summary: Retrieve a NewsCategory
 *     description: Retrieve detailed information of a specific NewsCategory.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NewsCategory id
 */
router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/news-categories/{id}:
 *   patch:
 *     tags: [NewsCategories]
 *     summary: Update a NewsCategory
 *     description: Update NewsCategory details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NewsCategory ID
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
 *                 description: Title of the news category.
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: "International Politics"
 *               description:
 *                 type: string
 *                 description: A brief description or summary of the news category.
 *                 example: "Updates and analysis on global political events."
 *               slug:
 *                 type: string
 *                 pattern: '/^[a-z0-9]+(?:-[a-z0-9]+)*$/'
 *                 description: URL-friendly string identifier.
 *                 example: "international-politics"
 *               image:
 *                 type: string
 *                 description: URL of the image representing the news category content.
 *                 format: uri
 *                 example: "http://example.com/image.jpg"
 *               parent:
 *                 type: string
 *                 description: The unique identifier for the parent category, if any.
 *                 format: uuid
 *                 nullable: true
 *                 example: null
 *               level:
 *                 type: integer
 *                 minimum: 1
 *                 description: The level of the category in the hierarchy, if applicable.
 *                 example: 1
 */
router.patch(
    "/:id",
    authenticateJWT,
    authorizeRole({
        admin: "", // Full access
        executive: "", // Full access
    }),
    dynamicValidate(newsCategoryValidationSchema),
    updateController
);

export default router;
