import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { createController } from "../app/controllers/news/create.controller.mjs";
import { deleteController } from "../app/controllers/news/delete.controller.mjs";
import { indexController } from "../app/controllers/news/index.controller.mjs";
import { showController } from "../app/controllers/news/show.controller.mjs";
import { updateController } from "../app/controllers/news/update.controller.mjs";
import { newsValidationSchema } from "../app/validations/news.validation.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management and retrieval operations
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
 * /api/v1/news:
 *   post:
 *     tags: [News]
 *     summary: Create a new news item
 *     description: Adds a new news item to the database
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
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the news item.
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: "Breaking News: Major Developments"
 *               description:
 *                 type: string
 *                 description: Brief description or summary of the news item.
 *                 example: "This is a summary of major events happening now."
 *               slug:
 *                 type: string
 *                 pattern: '/^[a-z0-9]+(?:-[a-z0-9]+)*$/'
 *                 description: URL-friendly string identifier.
 *                 example: "breaking-news-major-developments"
 *               image:
 *                 type: string
 *                 description: URL of the image representing the news content.
 *                 format: uri
 *                 example: "http://example.com/image.jpg"
 *               categoryId:
 *                 type: string
 *                 description: The unique identifier for the news category.
 *                 format: uuid
 *                 example: "5e1a0651865ade6a6b5c2542"
 *               tags:
 *                 type: array
 *                 description: List of tag IDs associated with the news.
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example:
 *                   - "5e1a0651865ade6a6b5c2541"
 *                   - "5e1a0651865ade6a6b5c2540"
 *               comments:
 *                 type: array
 *                 description: List of comment IDs for the news.
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example:
 *                   - "5e1a0651865ade6a6b5c253f"
 *                   - "5e1a0651865ade6a6b5c253e"
 *               publishDate:
 *                 type: string
 *                 format: date-time
 *                 description: The ISO 8601 formatted date time when the news was published.
 *                 example: "2023-10-20T08:00:00Z"
 *               specialDate:
 *                 type: string
 *                 format: date-time
 *                 description: Any special date associated with the news, formatted in ISO 8601.
 *                 example: "2023-11-25T11:30:00Z"
 */

router.post(
    "/",
    authenticateJWT,
    dynamicValidate(newsValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/news/{id}:
 *   delete:
 *     tags: [News]
 *     summary: Delete a News
 *     description: Delete a News with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: News ID
 */
router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/news:
 *   get:
 *     tags: [News]
 *     summary: Retrieve News
 *     description: Retrieve a list of News with pagination.
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
 * /api/v1/news/{slug}:
 *   get:
 *     tags: [News]
 *     summary: Retrieve a News
 *     description: Retrieve detailed information of a specific News.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: News slug
 */
router.get("/:slug", showController);

/**
 * @swagger
 * /api/v1/news/{id}:
 *   patch:
 *     tags: [News]
 *     summary: Update a news
 *     description: Update news details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: news ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - slug
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the news item.
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: "Breaking News: Major Developments"
 *               description:
 *                 type: string
 *                 description: Brief description or summary of the news item.
 *                 example: "This is a summary of major events happening now."
 *               slug:
 *                 type: string
 *                 pattern: '/^[a-z0-9]+(?:-[a-z0-9]+)*$/'
 *                 description: URL-friendly string identifier.
 *                 example: "breaking-news-major-developments"
 *               image:
 *                 type: string
 *                 description: URL of the image representing the news content.
 *                 format: uri
 *                 example: "http://example.com/image.jpg"
 *               categoryId:
 *                 type: string
 *                 description: The unique identifier for the news category.
 *                 format: uuid
 *                 example: "5e1a0651865ade6a6b5c2542"
 *               tags:
 *                 type: array
 *                 description: List of tag IDs associated with the news.
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example:
 *                   - "5e1a0651865ade6a6b5c2541"
 *                   - "5e1a0651865ade6a6b5c2540"
 *               comments:
 *                 type: array
 *                 description: List of comment IDs for the news.
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example:
 *                   - "5e1a0651865ade6a6b5c253f"
 *                   - "5e1a0651865ade6a6b5c253e"
 *               publishDate:
 *                 type: string
 *                 format: date-time
 *                 description: The ISO 8601 formatted date time when the news was published.
 *                 example: "2023-10-20T08:00:00Z"
 *               specialDate:
 *                 type: string
 *                 format: date-time
 *                 description: Any special date associated with the news, formatted in ISO 8601.
 *                 example: "2023-11-25T11:30:00Z"
 */
router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(newsValidationSchema),
    updateController
);

export default router;
