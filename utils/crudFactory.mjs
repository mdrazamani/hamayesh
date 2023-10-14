import { paginate } from "./pagination.mjs";
const handleAsync =
    (fn) =>
    (next) =>
    (...args) =>
        fn(next)(...args).catch((error) => {
            next(error);
        });

export default {
    getAll: (Model) =>
        handleAsync((next) => async (page, pageSize, query) => {
            return await paginate(Model, page, pageSize, query);
        }),
    get: (Model) =>
        handleAsync((next) => async (id) => {
            return await Model.findById(id);
        }),
    create: (Model) =>
        handleAsync((next) => async (data) => {
            const entity = new Model(data);
            return await entity.save();
        }),
    update: (Model) =>
        handleAsync((next) => async (id, data) => {
            return await Model.findByIdAndUpdate(id, data, { new: true });
        }),
    delete: (Model) =>
        handleAsync((next) => async (id) => {
            return await Model.findByIdAndDelete(id);
        }),
};
