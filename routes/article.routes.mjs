import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { createController } from "../app/controllers/article/create.controller.mjs";
import { deleteController } from "../app/controllers/article/delete.controller.mjs";
import { indexController } from "../app/controllers/article/index.controller.mjs";
import { showController } from "../app/controllers/article/show.controller.mjs";
import { updateController } from "../app/controllers/article/update.controller.mjs";
import { articleValidationSchema } from "../app/validations/article.validation.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";
import { downloadController } from "../app/controllers/article/download.controller.mjs";

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Articles management and retrieval operations
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
 * /api/v1/articles:
 *   post:
 *     tags: [Articles]
 *     summary: Create a new article
 *     description: Adds a new article to the database.
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
 *               - category
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: The title of the article. It must be unique and between 2 to 100 characters long.
 *               description:
 *                 type: string
 *                 nullable: true
 *                 description: An optional detailed description of the article. This field can be null or contain an empty string.
 *               category:
 *                 type: string
 *                 format: uuid
 *                 description: The ObjectId of the category to which the article belongs. It must be a string of 24 hexadecimal characters.
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The ObjectId of the user who created the article. It must be a string of 24 hexadecimal characters.
 *               articleFiles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       nullable: true
 *                       description: The title of the file. This field can be null or contain an empty string.
 *                     mimetype:
 *                       type: string
 *                       description: The MIME type of the file.
 *                     size:
 *                       type: integer
 *                       description: The size of the file in bytes.
 *                 description: Optional. An array of files associated with the article. It can be an empty array.
 *               presentationFiles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       nullable: true
 *                       description: The title of the presentation file. This field can be null or contain an empty string.
 *                     mimetype:
 *                       type: string
 *                       description: The MIME type of the presentation file.
 *                     size:
 *                       type: integer
 *                       description: The size of the presentation file in bytes.
 *                 description: Optional. An array of presentation files associated with the article. It can be an empty array.
 *               arbitration:
 *                 type: object
 *                 properties:
 *                   refereeId:
 *                     type: string
 *                     format: uuid
 *                     nullable: true
 *                     description: The ObjectId of the referee user, if applicable. It must be a string of 24 hexadecimal characters.
 *                   message:
 *                     type: string
 *                     nullable: true
 *                     description: An optional message or comment from the referee. This field can be null or contain an empty string.
 *                 description: Optional. Information about the arbitration status, if applicable.
 */

router.post(
    "/",
    authenticateJWT,
    dynamicValidate(articleValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/articles/{id}:
 *   delete:
 *     tags: [Articles]
 *     summary: Delete a article
 *     description: Delete a article with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: article ID
 */

router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/articles:
 *   get:
 *     tags: [Articles]
 *     summary: Retrieve article
 *     description: Retrieve a list of article with pagination.
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

router.get("/", authenticateJWT, indexController);

/**
 * @swagger
 * /api/v1/articles/{id}:
 *   get:
 *     tags: [Articles]
 *     summary: Retrieve a article
 *     description: Retrieve detailed information of a specific article.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: article ID
 */

router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/articles/{id}:
 *   patch:
 *     tags: [Articles]
 *     summary: Update a article
 *     description: Update article details.
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
 *               - category
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: The title of the article. It must be unique and between 2 to 100 characters long.
 *               description:
 *                 type: string
 *                 nullable: true
 *                 description: An optional detailed description of the article. This field can be null or contain an empty string.
 *               category:
 *                 type: string
 *                 format: uuid
 *                 description: The ObjectId of the category to which the article belongs. It must be a string of 24 hexadecimal characters.
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The ObjectId of the user who created the article. It must be a string of 24 hexadecimal characters.
 *               articleFiles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       nullable: true
 *                       description: The title of the file. This field can be null or contain an empty string.
 *                     mimetype:
 *                       type: string
 *                       description: The MIME type of the file.
 *                     size:
 *                       type: integer
 *                       description: The size of the file in bytes.
 *                 description: Optional. An array of files associated with the article. It can be an empty array.
 *               presentationFiles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       nullable: true
 *                       description: The title of the presentation file. This field can be null or contain an empty string.
 *                     mimetype:
 *                       type: string
 *                       description: The MIME type of the presentation file.
 *                     size:
 *                       type: integer
 *                       description: The size of the presentation file in bytes.
 *                 description: Optional. An array of presentation files associated with the article. It can be an empty array.
 *               arbitration:
 *                 type: object
 *                 properties:
 *                   refereeId:
 *                     type: string
 *                     format: uuid
 *                     nullable: true
 *                     description: The ObjectId of the referee user, if applicable. It must be a string of 24 hexadecimal characters.
 *                   message:
 *                     type: string
 *                     nullable: true
 *                     description: An optional message or comment from the referee. This field can be null or contain an empty string.
 *                 description: Optional. Information about the arbitration status, if applicable.
 */

router.patch(
    "/:id",
    authenticateJWT,
    // dynamicValidate(articleValidationSchema),
    updateController
);

router.get(
    "/download/all/:id",
    authenticateJWT,
    // dynamicValidate(articleValidationSchema),
    downloadController
);
export default router;
