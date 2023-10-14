import express from "express";
import userRoutes from "./user.routes.mjs";
import authRoutes from "./auth.routes.mjs";

import {
    authenticateJWT,
    authorizeRole,
} from "../app/middlewares/auth.middleware.mjs";
import { handleFileUpload } from "../app/controllers/fileUploader.controller.mjs";
import { dynamicValidate } from "../utils/validate.mjs";
import { fileUploadValidation } from "../app/validations/uploader.validation.mjs";

const router = express.Router();

// router.use("/auth", authRoutes({ validate }));
router.use("/auth", authRoutes);
router.use("/admin/users", authenticateJWT, authorizeRole("admin"), userRoutes);

//////////////////////////////////////////
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
 *         example: en
 *         default: en
 *       required: true
 *       description: Client language preference
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     tags: [FileUpload]
 *     description: Upload a file
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
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
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 path:
 *                   type: string
 *                   example: "/path/to/file"
 *                 name:
 *                   type: string
 *                   example: "file.jpg"
 *                 mimetype:
 *                   type: string
 *                   example: "image/jpeg"
 *                 size:
 *                   type: number
 *                   example: 123456
 *       400:
 *         description: Bad request (e.g., no files provided)
 *       500:
 *         description: Server error
 */
router.post("/upload", dynamicValidate(fileUploadValidation), handleFileUpload);

export default router;
