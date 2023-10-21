import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { createController } from "../app/controllers/news/newsComment/create.controller.mjs";
import { deleteController } from "../app/controllers/news/newsComment/delete.controller.mjs";
import { indexController } from "../app/controllers/news/newsComment/index.controller.mjs";
import { showController } from "../app/controllers/news/newsComment/show.controller.mjs";
import { updateController } from "../app/controllers/news/newsComment/update.controller.mjs";
import { newsCommentValidationSchema } from "../app/validations/newsComment.validation.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";
import { likeController } from "../app/controllers/news/newsComment/like.controller.mjs";

/**
 * @swagger
 * tags:
 *   name: NewsComments
 *   description: NewsComment management and retrieval operations
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
 * /api/v1/news-comments:
 *   post:
 *     tags: [NewsComments]
 *     summary: Add a comment to a news item
 *     description: Create a new comment for a specific news article.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The text content of the comment.
 *                 minLength: 1
 *                 example: "This is a very insightful news article!"
 *               userFirstName:
 *                 type: string
 *                 description: First name of the user posting the comment.
 *                 maxLength: 100
 *                 example: "John"
 *               userLastName:
 *                 type: string
 *                 description: Last name of the user posting the comment.
 *                 maxLength: 100
 *                 example: "Doe"
 *               userEmail:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *                 example: "johndoe@example.com"
 *               userIp:
 *                 type: string
 *                 format: ipv4
 *                 description: IP address of the user when posting the comment.
 *                 example: "192.0.2.1"
 */

router.post(
    "/",
    authenticateJWT,
    dynamicValidate(newsCommentValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/news-comments/{id}:
 *   delete:
 *     tags: [NewsComments]
 *     summary: Delete a NewsComment
 *     description: Delete a NewsComment with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NewsComment ID
 */
router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/news-comments:
 *   get:
 *     tags: [NewsComments]
 *     summary: Retrieve NewsComment
 *     description: Retrieve a list of NewsComment with pagination.
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
 * /api/v1/news-comments/{id}:
 *   get:
 *     tags: [NewsComments]
 *     summary: Retrieve a NewsComment
 *     description: Retrieve detailed information of a specific NewsComment.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NewsComment id
 */
router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/news-comments/{id}:
 *   patch:
 *     tags: [NewsComments]
 *     summary: Update a NewsComment
 *     description: Update NewsComment details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NewsComment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The text content of the comment.
 *                 minLength: 1
 *                 example: "This is a very insightful news article!"
 *               userFirstName:
 *                 type: string
 *                 description: First name of the user posting the comment.
 *                 maxLength: 100
 *                 example: "John"
 *               userLastName:
 *                 type: string
 *                 description: Last name of the user posting the comment.
 *                 maxLength: 100
 *                 example: "Doe"
 *               userEmail:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *                 example: "johndoe@example.com"
 *               userIp:
 *                 type: string
 *                 format: ipv4
 *                 description: IP address of the user when posting the comment.
 *                 example: "192.0.2.1"
 */
router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(newsCommentValidationSchema),
    updateController
);

/**
 * @swagger
 * /api/v1/news-comments/like/{id}:
 *   patch:
 *     tags: [NewsComments]
 *     summary: Like a NewsComment
 *     description: Like NewsComment details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NewsComment ID
 */
router.patch("/like/:id", likeController);

export default router;
