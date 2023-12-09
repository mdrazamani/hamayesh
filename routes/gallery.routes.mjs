// gallery.routes.mjs

import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import {
    addImageValidationSchema,
    createGalleryValidationSchema,
    updateGalleryValidationSchema,
    updateImageValidationSchema,
} from "../app/validations/gallery.validation.mjs"; // Update these based on your actual file structure
import {
    authenticateJWT,
    authorizeRole,
} from "../app/middlewares/auth.middleware.mjs";
import { createGalleryController } from "../app/controllers/gallery/create.controller.mjs";
import { getAllGalleriesController } from "../app/controllers/gallery/index.controller.mjs";
import { getGalleryController } from "../app/controllers/gallery/show.controller.mjs";
import { deleteGalleryController } from "../app/controllers/gallery/delete.controller.mjs";
import { updateGalleryController } from "../app/controllers/gallery/update.controller.mjs";
import {
    addImageController,
    deleteImageController,
    updateImageController,
} from "../app/controllers/gallery/gallery.controller.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Galleries
 *   description: Gallery management and retrieval operations
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

// ... (Swagger documentation setup for each route like in your question routes)

/**
 * @swagger
 * /api/v1/galleries:
 *   post:
 *     tags: [Galleries]
 *     summary: Create a new gallery
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
 *               category:
 *                 type: string
 *                 description: Title of the gallery.
 *               slug:
 *                 type: string
 *                 description: slug of the gallery.
 *               isActive:
 *                 type: boolean
 *                 description: status of the gallery.
 *               description:
 *                 type: string
 *                 description: Detailed description of the gallery.
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     path:
 *                       type: string
 *                       description: URL of the image.
 *                     title:
 *                       type: string
 *                       description: Caption for the image.
 *                 description: Can be a single image or an array of images.
 *             required:
 *               - category
 *               - slug
 *               - images
 *               - isActive
 */

router.post(
    "/",
    authenticateJWT,
    authorizeRole({
        admin: "", // Full access
        executive: "", // Full access
    }),
    dynamicValidate(createGalleryValidationSchema),
    createGalleryController
);

/**
 * @swagger
 * /api/v1/galleries:
 *   get:
 *     tags: [Galleries]
 *     summary: Retrieve all galleries
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 */

router.get("/", getAllGalleriesController);

/**
 * @swagger
 * /api/v1/galleries/{id}:
 *   get:
 *     tags: [Galleries]
 *     summary: Retrieve a single gallery
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gallery ID
 */

router.get("/:id", getGalleryController);

/**
 * @swagger
 * /api/v1/galleries/{id}:
 *   delete:
 *     tags: [Galleries]
 *     summary: Delete a gallery
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gallery ID
 */

router.delete(
    "/:id",
    authenticateJWT,
    authorizeRole({
        admin: "", // Full access
        executive: "", // Full access
    }),
    deleteGalleryController
);

/**
 * @swagger
 * /api/v1/galleries/{id}:
 *   patch:
 *     tags: [Galleries]
 *     summary: Update a gallery's information
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gallery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: Title of the gallery.
 *               slug:
 *                 type: string
 *                 description: slug of the gallery.
 *               isActive:
 *                 type: boolean
 *                 description: status of the gallery.
 *               description:
 *                 type: string
 *                 description: Detailed description of the gallery.
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     path:
 *                       type: string
 *                       description: URL of the image.
 *                     title:
 *                       type: string
 *                       description: Caption for the image.
 *                 description: Can be a single image or an array of images.
 */

router.patch(
    "/:id",
    authenticateJWT,
    authorizeRole({
        admin: "", // Full access
        executive: "", // Full access
    }),
    dynamicValidate(updateGalleryValidationSchema), // Ensure you have the appropriate validation schema
    updateGalleryController
);

// Nested routes for image management within galleries

/**
 * @swagger
 * /api/v1/galleries/{galleryId}/images:
 *   post:
 *     tags: [Galleries]
 *     summary: Add an image to a gallery
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: galleryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Gallery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 description: URL of the image.
 *               title:
 *                 type: string
 *                 description: Caption for the image.
 *             required:
 *               - path
 *               - title
 */

router.post(
    "/:galleryId/images",
    authenticateJWT,
    authorizeRole({
        admin: "", // Full access
        executive: "", // Full access
    }),
    dynamicValidate(addImageValidationSchema), // Ensure you have the appropriate validation schema
    addImageController
);

/**
 * @swagger
 * /api/v1/galleries/{galleryId}/images/{imageId}:
 *   patch:
 *     tags: [Galleries]
 *     summary: Update an image within a gallery
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: galleryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Gallery ID
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Image ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 description: Updated URL of the image.
 *               title:
 *                 type: string
 *                 description: Updated caption for the image.
 *             required:
 *               - imageUrl
 *               - caption
 */

router.patch(
    "/:galleryId/images/:imageId",
    authenticateJWT,
    authorizeRole({
        admin: "", // Full access
        executive: "", // Full access
    }),
    dynamicValidate(updateImageValidationSchema), // Ensure you have the appropriate validation schema
    updateImageController
);

/**
 * @swagger
 * /api/v1/galleries/{galleryId}/images/{imageId}:
 *   delete:
 *     tags: [Galleries]
 *     summary: Delete an image within a gallery
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: galleryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Gallery ID
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Image ID
 */
router.delete(
    "/:galleryId/images/:imageId",
    authenticateJWT,
    authorizeRole({
        admin: "", // Full access
        executive: "", // Full access
    }),
    deleteImageController
);

export default router;
