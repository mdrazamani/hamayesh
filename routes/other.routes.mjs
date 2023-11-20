import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import {
    getAllCountries,
    getAllSates,
    getCitiesByState,
} from "../app/controllers/others/country.controller.mjs";
import { getAllEvent } from "../app/controllers/others/eventLog.controller.mjs";
import { handleFileUpload } from "../app/controllers/others/fileUploader.controller.mjs";
import {
    authenticateJWT,
    authorizeRole,
} from "../app/middlewares/auth.middleware.mjs";
import { sendTicketController } from "../app/controllers/others/sendTicket.controller.mjs";
import { messageValidationSchema } from "../app/validations/ticketEmail.validation.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: FileUpload
 *   description: File upload related routes
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

/**
 * @swagger
 * /api/v1/upload:
 *   post:
 *     tags: [FileUpload]
 *     description: Upload a file
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: The file(s) to upload
 */
router.post("/upload", authenticateJWT, handleFileUpload);

/**
 * @swagger
 * /api/v1/countries:
 *   get:
 *     tags: [Countries]
 *     summary: Retrieve a list of all countries
 *     description: This endpoint retrieves a list of all countries.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 */
router.get("/countries", getAllCountries);

/**
 * @swagger
 * /api/v1/countries:
 *   get:
 *     tags: [Countries]
 *     summary: Retrieve a list of all countries
 *     description: This endpoint retrieves a list of all countries.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 */
router.get(
    "/activity-log",
    authenticateJWT,
    authorizeRole({ admin: "" }),
    getAllEvent
);

/**
 * @swagger
 * /api/v1/states:
 *   get:
 *     tags: [States]
 *     description: Retrieve a list of states by country
 *     parameters:
 *       - in: path
 *         name: countryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the country
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 */
router.get("/states", getAllSates); // Get states by country

/**
 * @swagger
 * /api/v1/states/{stateId}/cities:
 *   get:
 *     tags: [Cities]
 *     description: Retrieve a list of cities by state
 *     parameters:
 *       - in: path
 *         name: stateId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the state
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 */
router.get("/states/:stateId/cities", getCitiesByState); // Get cities by state

/**
 * @swagger
 * /api/v1/states/{stateId}/cities:
 *   get:
 *     tags: [Cities]
 *     description: Retrieve a list of cities by state
 *     parameters:
 *       - in: path
 *         name: stateId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the state
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 */
router.post(
    "/ticket/:id",
    dynamicValidate(messageValidationSchema),
    sendTicketController
); // Get cities by state

export default router;
