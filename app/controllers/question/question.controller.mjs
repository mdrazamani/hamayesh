// question.controller.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import {
    addNestedItem,
    updateNestedItem,
    deleteNestedItem,
} from "../../services/question.service.mjs";

export const addNestedItemController = async (req, res, next) => {
    try {
        const { id } = req.params; // This is the ID of the main document
        const newItem = req.body;
        const updatedQuestion = await addNestedItem(id, newItem);
        res.respond(
            constants.OK,
            getMessage("success.success"),
            updatedQuestion
        );
    } catch (error) {
        next(error);
    }
};

export const updateNestedItemController = async (req, res, next) => {
    try {
        const { id, itemId } = req.params; // ID of the main document and the nested item
        const updateData = req.body;
        const updatedQuestion = await updateNestedItem(id, itemId, updateData);
        res.respond(
            constants.OK,
            getMessage("success.success"),
            updatedQuestion
        );
    } catch (error) {
        next(error);
    }
};

export const deleteNestedItemController = async (req, res, next) => {
    try {
        const { id, itemId } = req.params; // ID of the main document and the nested item
        await deleteNestedItem(id, itemId);
        res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};

