// QueryBuilder.js

export class QueryBuilder {
    constructor(query, queryString, options) {
        this.query = query;
        this.queryString = queryString;
        this.options = options;
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

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }

        return this;
    }

    paginate() {
        const skip = (this.options.page - 1) * this.options.pageSize;

        this.query = this.query.skip(skip).limit(this.options.pageSize);
        // this.originalQuery = this.query.find().merge(this.query);

        return this;
    }

    async totalDocuments() {
        // Since 'paginate' was called before, 'this.originalQuery' is the query before 'limit' and 'skip' were applied
        // return await this.originalQuery.countDocuments();

        return await this.query.find().skip(0).limit().countDocuments();
    }
}
