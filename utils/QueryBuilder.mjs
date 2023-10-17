// QueryBuilder.js

export class QueryBuilder {
    constructor(Model, queryString, options) {
        this.query = Model.find();
        this.Model = Model; // Store the Model for later queries
        this.queryString = queryString;
        this.options = options;
    }

    async execute() {
        // Ensure the query gets executed here.
        return await this.query.exec(); // '.exec()' will trigger the query to run and fetch the results.
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt|eq)\b/g,
            (match) => `$${match}`
        );

        const q = this.query.find(JSON.parse(queryStr)); // Initialized and assigned here.
        this.query = this.query.merge(q);

        return this;
    }

    sort() {
        let q; // Define the variable outside of the conditionals so it's in scope

        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            q = this.query.sort(sortBy); // sorts according to query parameters
        } else {
            q = this.query.sort("-createdAt"); // default sort when no parameter specified
        }

        // Here, 'q' will be a valid query object because it's assigned in both branches above
        this.query = this.query.merge(q); // No more ReferenceError

        return this;
    }

    limitFields() {
        let q; // We define 'q' at the beginning of the method so it's available in this scope.

        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            q = this.query.select(fields); // If specific fields are provided, we limit to those.
        } else {
            q = this.query.select("-__v"); // Otherwise, we exclude the "__v" field (a common practice with Mongoose).
        }

        // At this point, 'q' is a valid query object because it's been assigned in both branches above.
        this.query = this.query.merge(q); // We merge 'q' into our main query.

        return this; // By returning 'this', we allow for method chaining.
    }

    paginate() {
        const skip = (this.options.page - 1) * this.options.pageSize;
        const q = this.query.skip(skip).limit(this.options.pageSize); // Initialized and assigned here.
        this.query = this.query.merge(q);

        return this;
    }
    search() {
        if (this.queryString.search) {
            // Constructing the text search query.
            const searchQuery = { $text: { $search: this.queryString.search } };

            console.log("Executing text search with query:", searchQuery);

            // MongoDB will use the text index to perform this search.
            this.query = this.query.find(searchQuery);
        }

        return this;
    }

    async totalDocuments() {
        // No need for the 'q' variable here as we are directly returning the result of an operation.
        return await this.Model.countDocuments(this.query.getFilter());
    }
}
