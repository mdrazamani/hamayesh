import express from "express";
import { dynamicValidate } from "../utils/validate.mjs";
import { showController } from "../app/controllers/hamayeshDetail/show.controller.mjs";
import { updateController } from "../app/controllers/hamayeshDetail/update.controller.mjs";
import { hamayeshDetailValidationSchema } from "../app/validations/hamayeshDetail.validation.mjs";
import { authenticateJWT } from "../app/middlewares/auth.middleware.mjs";

/**
 * @swagger
 * tags:
 *   name: HamayeshDetail
 *   description: HamayeshDetail management and retrieval operations
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
 * /api/v1/hamayesh-detail/{id}:
 *   get:
 *     tags: [HamayeshDetail]
 *     summary: Retrieve a HamayeshDetail
 *     description: Retrieve detailed information of a specific HamayeshDetail.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: HamayeshDetail ID
 */

router.get("/:id", showController);

/**
 * @swagger
 * /api/v1/hamayesh-detail/{id}:
 *   patch:
 *     tags: [HamayeshDetail]
 *     summary: Update a HamayeshDetail
 *     description: Update HamayeshDetail details.
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
 *               - faTitle
 *               - enTitle
 *               - iscCode
 *               - eventAddress
 *             properties:
 *               faTitle:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: The Persian title of the HamayeshDetail.
 *               enTitle:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: The English title of the HamayeshDetail.
 *               description:
 *                 type: string
 *                 description: Optional description for the HamayeshDetail.
 *               iscCode:
 *                 type: string
 *                 description: The required ISC code of the HamayeshDetail.
 *               aboutHtml:
 *                 type: string
 *                 description: Optional HTML content about the HamayeshDetail.
 *               poster:
 *                 type: string
 *                 description: Optional string content for the HamayeshDetail's poster.
 *               eventAddress:
 *                 type: object
 *                 description: Object holding address details for the event. 'address' field is required.
 *                 properties:
 *                   state:
 *                     type: string
 *                     nullable: true
 *                     description: State of the event location.
 *                   city:
 *                     type: string
 *                     nullable: true
 *                     description: City of the event location.
 *                   address:
 *                     type: string
 *                     description: Detailed address of the event location.
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     nullable: true
 *                     description: Geographical longitude of the event location.
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     nullable: true
 *                     description: Geographical latitude of the event location.
 */

router.patch(
    "/:id",
    authenticateJWT,
    dynamicValidate(hamayeshDetailValidationSchema),
    updateController
);

export default router;
