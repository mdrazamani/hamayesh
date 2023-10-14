export const paginate = async (Model, page = 1, pageSize = 10, query = {}) => {
    try {
        const skip = (page - 1) * pageSize;
        const items = await Model.find(query).skip(skip).limit(pageSize);
        const total = await Model.countDocuments(query);

        return {
            items,
            total,
            pages: Math.ceil(total / pageSize),
            currentPage: page,
        };
    } catch (error) {
        throw new Error("Error during pagination");
    }
};
