import express from "express";
import { getRegistrationSchema } from "../app/validations/auth.validation.mjs";
import { dynamicValidate } from "../utils/validate.mjs";
import multer from "multer";
import { createController } from "../app/controllers/user/create.controller.mjs";
import { deleteController } from "../app/controllers/user/delete.controller.mjs";
import { indexController } from "../app/controllers/user/index.controller.mjs";
import { showController } from "../app/controllers/user/show.controller.mjs";
import { updateController } from "../app/controllers/user/update.controller.mjs";
import { paginationValidation } from "../app/validations/pagination.validation.mjs";

const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: users related routes
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
 * /api/v1/users:
 *   post:
 *     tags: [Users]
 *     description: Create a new user
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               password:
 *                 type: string
 *                 description: The user's password
 *               email:
 *                 type: string
 *                 description: The user's email
 *               role:
 *                 type: string
 *                 description: The user's role (optional)
 */
router.post(
    "/",
    upload.none(), // multer parses the form data
    dynamicValidate(getRegistrationSchema),
    createController
);

router.delete("/:id", deleteController);

router.get(
    "/",
    upload.none(), // multer parses the form data
    dynamicValidate(paginationValidation),
    indexController
);
router.get("/:id", showController);

router.patch(
    "/:id",
    upload.none(), // multer parses the form data
    updateController
);

export default router;
