// crudFactory.mjs

import { getMessage } from "../config/i18nConfig.mjs";
import constants from "./constants.mjs";
import APIError from "./errors.mjs";
import { paginate } from "./pagination.mjs";
import { QueryBuilder } from "./QueryBuilder.mjs";

export default {
    getAll: (Model) => async (queryParams) => {
        try {
            // Destructure page and pageSize from queryParams and provide default values if not present
            const { page = 1, pageSize = 10, ...otherParams } = queryParams;

            // Create a new QueryBuilder instance. Here, we're passing an empty find query and the query parameters.
            const queryBuilder = new QueryBuilder(Model, otherParams); // Assuming `User` is your Mongoose model.

            // Apply the various query building methods for filtering, sorting, field selection, and pagination.
            queryBuilder.filter().sort().limitFields().paginate(page, pageSize); // We assume your `paginate` method now accepts these parameters.

            // Execute the query to get the paginated results.
            const paginatedResults = await queryBuilder.query;
            // Additionally, fetch the total number of documents matching the filter criteria.
            const totalDocuments = await queryBuilder.totalDocuments();

            // Structure the response object, including the items and necessary pagination metadata.
            const response = {
                items: paginatedResults, // The actual results.
                total: totalDocuments, // Total number of matching documents.
                pages: Math.ceil(totalDocuments / pageSize), // Total number of pages.
                currentPage: page, // Current page number.
                pageSize, // Number of results per page.
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
    delete: (Model) => async (id, req) => {
        const deletedEntity = await Model.remove({ _id: id });
        if (!deletedEntity) {
            throw new APIError({
                message: getMessage("errors.not_found", req),
                status: constants.NOT_FOUND,
            });
        }
        return deletedEntity;
    },
};
