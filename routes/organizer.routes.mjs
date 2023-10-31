import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { createController } from "../app/controllers/organizer/create.controller.mjs";
import { deleteController } from "../app/controllers/organizer/delete.controller.mjs";
import { indexController } from "../app/controllers/organizer/index.controller.mjs";
import { showController } from "../app/controllers/organizer/show.controller.mjs";
import { updateController } from "../app/controllers/organizer/update.controller.mjs";
import {
    organizerUpdateValidationSchema,
    organizerValidationSchema,
} from "../app/validations/organizer.validation.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";

/**
 * @swagger
 * tags:
 *   name: Organizers
 *   description: Organizers management and retrieval operations
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
 * /api/v1/organizers:
 *   post:
 *     tags: [Organizers]
 *     summary: Create a new Organizer
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the Organizer.
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: The logo file for the Organizer.
 *               link:
 *                 type: string
 *                 description: A link associated with the Organizer.
 *               isMain:  # Ensure proper indentation for all nested properties
 *                 type: boolean
 *                 description: Whether or not the organizer is the main entity.
 *               details:  # 'details' is a nested object, so its structure is also nested
 *                 type: object
 *                 properties:  # All properties of 'details' should be nested under 'properties'
 *                   address:
 *                     type: object
 *                     properties:
 *                       state:
 *                         type: string
 *                         description: State where the Organizer is located.
 *                       city:
 *                         type: string
 *                         description: City where the Organizer is located.
 *                       address:
 *                         type: string
 *                         description: Physical address of the Organizer.
 *                       longitude:
 *                         type: number
 *                         format: float
 *                         description: Geographical longitude of the Organizer's location.
 *                       latitude:
 *                         type: number
 *                         format: float
 *                         description: Geographical latitude of the Organizer's location.
 *                   description:
 *                     type: string
 *                     description: A brief description of the Organizer.
 *                   emails:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: email
 *                     description: List of email addresses for the Organizer.
 *                   phoneNumbers:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of phone numbers for the Organizer.
 */
router.post(
    "/",
    authenticateJWT,
    dynamicValidate(organizerValidationSchema),
    createController
);

/**
 * @swagger
 * /api/v1/organizers/{id}:
 *   delete:
 *     tags: [Organizers]
 *     summary: Delete a Organizer
 *     description: Delete a Organizer with the provided ID.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organizer ID
 */

router.delete("/:id", authenticateJWT, deleteController);

/**
 * @swagger
 * /api/v1/organizers:
 *   get:
 *     tags: [Organizers]
 *     summary: Retrieve Organizers
 *     description: Retrieve a list of Organizers with pagination.
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
 * /api/v1/organizers/{id}:
 *   get:
 *     tags: [Organizers]
 *     summary: Retrieve a Organizer
 *     description: Retrieve detailed information of a specific Organizer.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organizer ID
 */

router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/organizers/{id}:
 *   patch:
 *     tags: [Organizers]
 *     summary: Update a Organizer
 *     description: Update Organizer details.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the Organizer.
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: The logo file for the Organizer.
 *               link:
 *                 type: string
 *                 description: A link associated with the Organizer.
 *               isMain:  # Ensure proper indentation for all nested properties
 *                 type: boolean
 *                 description: Whether or not the organizer is the main entity.
 *               details:  # 'details' is a nested object, so its structure is also nested
 *                 type: object
 *                 properties:  # All properties of 'details' should be nested under 'properties'
 *                   address:
 *                     type: object
 *                     properties:
 *                       state:
 *                         type: string
 *                         description: State where the Organizer is located.
 *                       city:
 *                         type: string
 *                         description: City where the Organizer is located.
 *                       address:
 *                         type: string
 *                         description: Physical address of the Organizer.
 *                       longitude:
 *                         type: number
 *                         format: float
 *                         description: Geographical longitude of the Organizer's location.
 *                       latitude:
 *                         type: number
 *                         format: float
 *                         description: Geographical latitude of the Organizer's location.
 *                   description:
 *                     type: string
 *                     description: A brief description of the Organizer.
 *                   emails:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: email
 *                     description: List of email addresses for the Organizer.
 *                   phoneNumbers:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of phone numbers for the Organizer.
 */

router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(organizerUpdateValidationSchema),
    updateController
);

export default router;
