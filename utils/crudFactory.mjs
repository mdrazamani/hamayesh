// crudFactory.mjs

import { getMessage } from "../config/i18nConfig.mjs";
import constants from "./constants.mjs";
import APIError from "./errors.mjs";
import {
    addNestedDocument,
    deleteNestedDocument,
    updateNestedDocument,
} from "./nested.mjs";
import { QueryBuilder } from "./QueryBuilder.mjs";

export default {
    getAll: (Model) => async (queryParams) => {
        try {
            const { page = 1, pageSize = 10, ...otherParams } = queryParams;

            const queryBuilder = new QueryBuilder(Model, otherParams, {
                page,
                pageSize,
            });

            queryBuilder.filter().search().sort().limitFields().paginate();

            // queryBuilder.search();

            const paginatedResults = await queryBuilder.execute();

            const totalDocuments = await queryBuilder.totalDocuments();

            const response = {
                items: paginatedResults,
                total: totalDocuments,
                pages: Math.ceil(totalDocuments / pageSize),
                currentPage: page,
                pageSize,
            };

            return response;
        } catch (error) {
            throw new APIError({
                message: getMessage("errors.during_pagination"),
                status: constants.BAD_REQUEST,
            });
        }
    },
    get: (Model) => async (id) => {
        const entity = await Model.findById(id);
        if (!entity) {
            throw new APIError({
                message: getMessage("errors.not_found"),
                status: constants.NOT_FOUND,
            });
        }
        return entity;
    },
    create: (Model) => async (data) => {
        const entity = new Model(data);
        return await entity.save();
    },
    update: (Model) => async (id, data) => {
        const updatedEntity = await Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!updatedEntity) {
            throw new APIError({
                message: getMessage("errors.not_found"),
                status: constants.NOT_FOUND,
            });
        }
        return updatedEntity;
    },
    delete: (Model) => async (id) => {
        const deletedEntity = await Model.findByIdAndDelete(id);
        if (!deletedEntity) {
            throw new APIError({
                message: getMessage("errors.not_found"),
                status: constants.NOT_FOUND,
            });
        }
        return deletedEntity;
    },

    addNested: (Model) => async (mainDocId, nestedField, itemData) => {
        try {
            const updatedDoc = await addNestedDocument(
                Model,
                mainDocId,
                nestedField,
                itemData
            );
            return updatedDoc;
        } catch (error) {
            throw new APIError({
                message: getMessage("errors.update_failed"),
                status: constants.BAD_REQUEST,
                errors: error.message, // Include the original error message
            });
        }
    },

    updateNested:
        (Model) => async (mainDocId, nestedField, itemId, itemData) => {
            try {
                const updatedDoc = await updateNestedDocument(
                    Model,
                    mainDocId,
                    nestedField,
                    itemId,
                    itemData
                );
                return updatedDoc;
            } catch (error) {
                throw new APIError({
                    message: getMessage("errors.update_failed"),
                    status: constants.BAD_REQUEST,
                    errors: error.message, // Include the original error message
                });
            }
        },

    deleteNested: (Model) => async (mainDocId, nestedField, itemId) => {
        try {
            const updatedDoc = await deleteNestedDocument(
                Model,
                mainDocId,
                nestedField,
                itemId
            );
            return updatedDoc;
        } catch (error) {
            throw new APIError({
                message: getMessage("errors.deletion_failed"),
                status: constants.BAD_REQUEST,
                errors: error.message, // Include the original error message
            });
        }
    },
};
