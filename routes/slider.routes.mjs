import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";

import {
    sliderValidation,
    sliderUpdateValidation,
} from "../app/validations/slider.validation.mjs";
import { createSliderController } from "../app/controllers/slider/create.controller.mjs";
import { deleteSliderController } from "../app/controllers/slider/delete.controller.mjs";
import { getAllSlidersController } from "../app/controllers/slider/index.controller.mjs";
import { getSliderController } from "../app/controllers/slider/show.controller.mjs";
import { updateSliderController } from "../app/controllers/slider/update.controller.mjs";

const router = express.Router();

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
/**
 * @swagger
 * /api/v1/sliders:
 *   post:
 *     tags: [Sliders]
 *     summary: Create a new slider
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     description: Create a new slider with the provided information.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the slider.
 *               image:
 *                 type: string
 *                 description: The path to the uploaded image file.
 *               link:
 *                 type: string
 *                 description: The URL the slider directs to (if any).
 *               isActive:
 *                 type: boolean
 *                 description: The active status of the slider.
 *               order:
 *                 type: integer
 *                 description: The display order of the slider.
 */
// POST request to create a new slider
router.post(
    "/",
    authenticateJWT,
    dynamicValidate(sliderValidation),
    createSliderController
);

/**
 * @swagger
 * /api/v1/sliders/{id}:
 *   delete:
 *     tags: [Sliders]
 *     summary: Delete a specific slider
 *     description: Delete a slider by its unique ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the slider to delete.
 */

// DELETE request to remove a slider by ID
router.delete("/:id", authenticateJWT, deleteSliderController);

/**
 * @swagger
 * /api/v1/sliders:
 *   get:
 *     tags: [Sliders]
 *     summary: Retrieve all sliders
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     description: Retrieve all sliders, possibly with pagination.
 *     security:
 *       - bearerAuth: []
 */

// GET request to fetch all sliders
router.get("/", getAllSlidersController);

/**
 * @swagger
 * /api/v1/sliders/{id}:
 *   get:
 *     tags: [Sliders]
 *     summary: Retrieve a specific slider
 *     description: Retrieve detailed information about a slider by its unique ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the slider to retrieve.
 */

// GET request to retrieve a single slider by ID
router.get("/:id", getSliderController);

/**
 * @swagger
 * /api/v1/sliders/{id}:
 *   patch:
 *     tags: [Sliders]
 *     summary: Update a specific slider
 *     description: Update information about a slider by its unique ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the slider to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the slider.
 *               image:
 *                 type: string
 *                 description: The path to the uploaded image file.
 *               link:
 *                 type: string
 *                 description: The URL the slider directs to (if any).
 *               isActive:
 *                 type: boolean
 *                 description: The active status of the slider.
 *               order:
 *                 type: integer
 *                 description: The display order of the slider.
 */

// PATCH request to update an existing slider's information
router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(sliderUpdateValidation),
    updateSliderController
);

export default router;
