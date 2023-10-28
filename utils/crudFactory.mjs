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
            const {
                populate,
                page = 1,
                pageSize = 10,
                ...otherParams
            } = queryParams;

            const queryBuilder = new QueryBuilder(Model, otherParams, {
                page,
                pageSize,
                populate, // pass populate here
            });

            queryBuilder
                .filter()
                .search()
                .sort()
                .limitFields()
                .paginate()
                .populate();

            // queryBuilder.search();
            const paginatedResults = await queryBuilder.execute();

            const totalDocuments = await queryBuilder.totalDocuments();
            // New function to generate pagination links
            const generatePaginationLinks = (
                currentPage,
                totalPages,
                pageSize
            ) => {
                const baseUrl = "/?page="; // Replace with your actual URL structure
                const links = [];

                // Previous link
                if (currentPage > 1) {
                    links.push({
                        url: `${baseUrl}${currentPage - 1}`,
                        label: "&laquo; Previous",
                        active: false,
                        page: currentPage - 1,
                    });
                }

                // Individual page links
                for (let i = 1; i <= totalPages; i++) {
                    links.push({
                        url: `${baseUrl}${i}`,
                        label: `${i}`,
                        active: i === currentPage,
                        page: i,
                    });
                }

                // Next link
                if (currentPage < totalPages) {
                    links.push({
                        url: `${baseUrl}${currentPage + 1}`,
                        label: "Next &raquo;",
                        active: false,
                        page: currentPage + 1,
                    });
                }

                return links;
            };

            // Calculate necessary pagination data
            const totalPages = Math.ceil(totalDocuments / pageSize);
            const currentPage = page;
            const firstPageUrl = "/?page=1"; // Replace with your actual URL structure
            const nextPageUrl =
                currentPage < totalPages ? `/?page=${currentPage + 1}` : null;
            const prevPageUrl =
                currentPage > 1 ? `/?page=${currentPage - 1}` : null;

            // Structure the final response
            const response = {
                data: paginatedResults, // This should be your actual data array
                payload: {
                    pagination: {
                        page: currentPage,
                        first_page_url: firstPageUrl,
                        from: (currentPage - 1) * pageSize + 1,
                        last_page: totalPages,
                        links: generatePaginationLinks(
                            currentPage,
                            totalPages,
                            pageSize
                        ),
                        next_page_url: nextPageUrl,
                        items_per_page: pageSize.toString(),
                        prev_page_url: prevPageUrl,
                        to: currentPage * pageSize,
                        total: totalDocuments,
                    },
                },
            };

            return response;
        } catch (error) {
            throw new APIError({
                message: getMessage("errors.during_pagination"),
                status: constants.BAD_REQUEST,
            });
        }
    },
    get:
        (Model) =>
        async (id, options = {}) => {
            try {
                // Start with a basic query
                let query = Model.findById(id);

                // If there are populate options, apply them
                if (options.populate) {
                    query = query.populate(options.populate);
                }

                // Execute the query and get the result
                const entity = await query.exec();

                if (!entity) {
                    throw new APIError({
                        message: getMessage("errors.not_found"),
                        status: constants.NOT_FOUND,
                    });
                }
                return entity;
            } catch (error) {
                throw new APIError({
                    message: error.message,
                    status: error.status,
                });
            }
        },

    getBySlug:
        (Model) =>
        async (slug, options = {}) => {
            try {
                let query = Model.findOne({ slug: slug });
                // If there are populate options, apply them
                if (options.populate) {
                    query = query.populate(options.populate);
                }

                // Execute the query and get the result
                const entity = await query.exec();

                if (!entity) {
                    throw new APIError({
                        message: getMessage("errors.not_found"),
                        status: constants.NOT_FOUND,
                    });
                }
                return entity;
            } catch (error) {
                throw new APIError({
                    message: error.message,
                    status: error.status,
                });
            }
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
        // Find the document
        const entity = await Model.findById(id);
        if (!entity) {
            throw new APIError({
                message: getMessage("errors.not_found"),
                status: constants.NOT_FOUND,
            });
        }

        // Call .remove() on the instance, not on the model.
        // This triggers the 'remove' middleware.
        const deletedEntity = await entity.remove();
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
