import express from "express";
import * as userController from "../controllers/user.controller.mjs";
import validationMiddleware from "../middleware/validation.middleware.mjs";
import userValidation from "../validations/user.validation.mjs";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post(
    "/",
    validationMiddleware(userValidation),
    userController.createUser
);

export default router;
