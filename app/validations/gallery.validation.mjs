// gallery.validation.mjs

import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

// Validation schema for creating a new gallery
export const createGalleryValidationSchema = () => ({
    body: Joi.object({
        description: Joi.string().messages({
            "string.empty": getMessage("validation.description_required"),
        }),
        category: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.category_required"),
            }),
        slug: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.slug_required"),
            }),
        images: Joi.array()
            .items(
                Joi.object({
                    path: Joi.string()
                        .required()
                        .messages({
                            "string.empty": getMessage(
                                "validation.path_required"
                            ),
                        }),
                    title: Joi.string().messages({
                        "string.empty": getMessage("validation.title_required"),
                    }),
                })
            )
            .optional(), // Images can be added later
    }).options({ abortEarly: false }),
});

// Validation schema for updating an existing gallery
export const updateGalleryValidationSchema = () => ({
    body: Joi.object({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        category: Joi.string().optional(),
        slug: Joi.string().optional(),
        images: Joi.array().optional(),
    }).options({ abortEarly: false }),
});

// Validation schema for adding a new image to a gallery
export const addImageValidationSchema = () => ({
    body: Joi.object({
        path: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.path_required"),
            }),
        title: Joi.string().messages({
            "string.empty": getMessage("validation.title_required"),
        }),
    }).options({ abortEarly: false }),
});

// Validation schema for updating an image in a gallery
export const updateImageValidationSchema = () => ({
    body: Joi.object({
        path: Joi.string().optional(),
        title: Joi.string().optional(),
    }).options({ abortEarly: false }),
});
