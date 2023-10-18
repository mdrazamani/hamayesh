import sanitize from "mongo-sanitize"; // To prevent NoSQL injection
import { getMessage } from "../config/i18nConfig.mjs";
import constants from "./constants.mjs";
import APIError from "./errors.mjs";

export class QueryBuilder {
    constructor(Model, queryString, options) {
        this.query = Model.find();
        this.Model = Model;
        this.queryString = queryString;
        this.options = options;
    }

    async execute() {
        try {
            return await this.query.exec();
        } catch (error) {
            // Implement proper error handling
            console.error("Error executing query:", error);
            throw new APIError(
                getMessage("errors.executing_query"),
                constants.BAD_REQUEST
            );
        }
    }

    filter() {
        // Sanitization and preparing filter conditions
        const queryObj = sanitize({ ...this.queryString }); // Sanitize input to prevent NoSQL injection attacks
        const excludedFields = [
            "page",
            "sort",
            "limit",
            "fields",
            "search",
            "populate",
        ];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt|eq)\b/g,
            (match) => `$${match}`
        );

        const additionalFilters = JSON.parse(queryStr);
        const currentFilters = this.query.getFilter();

        // Ensure no sensitive fields can be queried, for example:
        delete additionalFilters["sensitiveField1"];
        delete additionalFilters["sensitiveField2"];

        const combinedFilters = { ...currentFilters, ...additionalFilters };

        this.query.find(combinedFilters);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            // Validate and sanitize sort field to ensure it's a legitimate field
            const sortBy = sanitize(this.queryString.sort.split(",").join(" ")); // Prevent NoSQL injection in sort field
            this.query.sort(sortBy);
        } else {
            this.query.sort("-createdAt");
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            // Validate and sanitize fields
            const fields = sanitize(
                this.queryString.fields.split(",").join(" ")
            ); // Sanitize the fields input
            this.query.select(fields);
        } else {
            this.query.select("-__v");
        }
        return this;
    }

    paginate() {
        // Assuming options.page and options.pageSize are integers. If they come from user input, validate these as well.
        const page = this.options.page > 0 ? this.options.page : 1; // Ensure page is a positive integer
        const pageSize = this.options.pageSize > 0 ? this.options.pageSize : 10; // Ensure pageSize is a positive integer, and consider setting a maximum

        const skip = (page - 1) * pageSize;
        this.query = this.query.skip(skip).limit(pageSize);

        return this;
    }

    search() {
        if (this.queryString.search) {
            const searchTerm = sanitize(this.queryString.search); // Sanitize search term
            const searchQuery = { $text: { $search: searchTerm } };
            this.query = this.query.find(searchQuery);
        }
        return this;
    }

    async totalDocuments() {
        return await this.Model.countDocuments(this.query.getFilter()).catch(
            (error) => {
                console.error("Error counting documents:", error);
                throw new APIError(
                    getMessage(
                        "errors.counting_documents",
                        constants.BAD_REQUEST
                    )
                );
            }
        );
    }

    populate() {
        if (this.options.populate) {
            const populateOptions = this.options.populate;
            this.query = this.query.populate(populateOptions);
        }
        return this; // for method chaining
    }
}
