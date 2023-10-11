import { paginate } from "./pagination.mjs";
const handleAsync =
    (fn) =>
    (...args) =>
        fn(...args).catch(console.error);

export default {
    getAll: (Model) =>
        handleAsync(async (page, pageSize, query) => {
            return await paginate(Model, page, pageSize, query);
        }),
    get: (Model) =>
        handleAsync(async (id) => {
            return await Model.findById(id);
        }),
    create: (Model) =>
        handleAsync(async (data) => {
            const entity = new Model(data);
            return await entity.save();
        }),
    update: (Model) =>
        handleAsync(async (id, data) => {
            return await Model.findByIdAndUpdate(id, data, { new: true });
        }),
    delete: (Model) =>
        handleAsync(async (id) => {
            return await Model.findByIdAndDelete(id);
        }),
};
