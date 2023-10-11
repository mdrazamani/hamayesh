import crudFactory from "../../utils/crudFactory.mjs";
import User from "../models/user.model.mjs";

export const userService = {
    getAllUsers: (page, pageSize, query) =>
        crudFactory.getAll(User)(page, pageSize, query),
    getUser: (id) => crudFactory.get(User)(id),
    createUser: (data) => crudFactory.create(User)(data),
    updateUser: (id, data) => crudFactory.update(User)(id, data),
    deleteUser: (id) => crudFactory.delete(User)(id),
};
