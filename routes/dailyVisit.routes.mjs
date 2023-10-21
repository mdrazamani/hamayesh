import express from "express";
import { getSpecificVisitsController } from "../app/controllers/dailyVisit/show.controller.mjs";

/**
 * @swagger
 * tags:
 *   name: DailyVisits
 *   description: DailyVisit management and retrieval operations
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
 * /api/v1/daily-visits:
 *   get:
 *     tags: [DailyVisits]
 *     summary: Retrieve DailyVisits
 *     description: Retrieve a list of DailyVisits with pagination.
 *     parameters:
 *       - $ref: '#/components/parameters/AcceptLanguage'
 *       - $ref: '#/components/parameters/Authorization'
 */

router.get("/", getSpecificVisitsController);

export default router;
