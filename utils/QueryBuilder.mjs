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

        const q = this.query.find(JSON.parse(queryStr));
        this.query = this.query.find().merge(q);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            const q = this.query.sort(sortBy);
        } else {
            const q = this.query.sort("-createdAt");
        }
        this.query = this.query.find().merge(q);

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            const q = this.query.select(fields);
        } else {
            const q = this.query.select("-__v");
        }
        this.query = this.query.find().merge(q);

        return this;
    }

    paginate() {
        const skip = (this.options.page - 1) * this.options.pageSize;

        const q = this.query.skip(skip).limit(this.options.pageSize);
        this.query = this.query.find().merge(q);

        return this;
    }

    search() {
        if (this.queryString.search) {
            const textSearchQuery = {
                $text: { $search: this.queryString.search },
            };

            const q = this.query.find(textSearchQuery);
            this.query = this.query.find().merge(q);
        }
        return this;
    }

    async totalDocuments() {
        // Since 'paginate' was called before, 'this.originalQuery' is the query before 'limit' and 'skip' were applied
        // return await this.originalQuery.countDocuments();

        return await this.query.find().skip(0).limit().countDocuments();
    }
}
