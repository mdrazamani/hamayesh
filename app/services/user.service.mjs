import crudFactory from "../../utils/crudFactory.mjs";
import User from "../models/user.model.mjs";
import Role from "../models/role.model.mjs";
import constants from "../../utils/constants.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";

export const create = async (data, next) => {
    const role = await Role.findOne({ name: data.role });
    if (!role) {
        // Using the unified response handler to send error response
        return res.respond(
            constants.BAD_REQUEST,
            getMessage("errors.invalidRole", req)
        );
    }
    data.role = { id: role._id, name: role.name };

    return await crudFactory.create(User)(next)(data);
};

export const update = (id, data, next) =>
    crudFactory.update(User)(next)(id, data);

export const get = (id, next) => crudFactory.get(User)(next)(id);

export const getAllUsers = (page, pageSize, query, next) =>
    crudFactory.getAll(User)(next)(page, pageSize, query);

export const deleteDoc = (id, next) => crudFactory.delete(User)(next)(id);
