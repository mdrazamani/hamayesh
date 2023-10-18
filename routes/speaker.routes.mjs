import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { createSpeakerController } from "../app/controllers/speaker/create.controller.mjs";
import { deleteSpeakerController } from "../app/controllers/speaker/delete.controller.mjs";
import { getAllSpeakersController } from "../app/controllers/speaker/index.controller.mjs";
import { getSpeakerController } from "../app/controllers/speaker/show.controller.mjs";
import { updateSpeakerController } from "../app/controllers/speaker/update.controller.mjs";
import {
    speakerValidation,
    speakerUpdateValidation,
} from "../app/validations/speaker.validation.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";

/**
 * @swagger
 * tags:
 *   name: Speakers
 *   description: Speaker management and retrieval operations
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
 * /api/v1/speakers:
 *   post:
 *     tags: [Speakers]
 *     summary: Create a new speaker
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the speaker.
 *               description:
 *                 type: string
 *                 description: A brief description of the speaker.
 *               user:
 *                 type: string
 *                 description: The user ID associated with the speaker.
 */
router.post(
    "/",
    authenticateJWT,
    dynamicValidate(speakerValidation),
    createSpeakerController
);

/**
 * @swagger
 * /api/v1/speakers/{id}:
 *   delete:
 *     tags: [Speakers]
 *     summary: Delete a speaker
 *     description: Delete a speaker with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Speaker ID
 */
router.delete("/:id", authenticateJWT, deleteSpeakerController);

/**
 * @swagger
 * /api/v1/speakers:
 *   get:
 *     tags: [Speakers]
 *     summary: Retrieve speakers
 *     description: Retrieve a list of speakers with pagination.
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
router.get("/", getAllSpeakersController);

/**
 * @swagger
 * /api/v1/speakers/{id}:
 *   get:
 *     tags: [Speakers]
 *     summary: Retrieve a speaker
 *     description: Retrieve detailed information of a specific speaker.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Speaker ID
 */
router.get("/:id", getSpeakerController);

/**
 * @swagger
 * /api/v1/speakers/{id}:
 *   patch:
 *     tags: [Speakers]
 *     summary: Update a speaker
 *     description: Update speaker details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Speaker ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the speaker.
 *               description:
 *                 type: string
 *                 description: A brief description of the speaker.
 */
router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(speakerUpdateValidation),
    updateSpeakerController
);

export default router;
