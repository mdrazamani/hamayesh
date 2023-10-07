import express from "express";
import { createUser } from "../app/controllers/user/create.controller.mjs";
import validationMiddleware from "../app/middlewares/validation.middleware.mjs";
import userValidation from "../app/validations/user.validation.mjs";

const router = express.Router();

router.post("/", validationMiddleware(userValidation), createUser);

export default router;
