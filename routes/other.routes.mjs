import express from "express";
import { handleFileUpload } from "../app/controllers/others/fileUploader.controller.mjs";
import { dynamicValidate } from "../utils/validate.mjs";
import { fileUploadValidation } from "../app/validations/uploader.validation.mjs";

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
router.post("/upload", handleFileUpload);

export default router;
