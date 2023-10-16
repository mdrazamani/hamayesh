// userService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import User, { getUsersWithStructure } from "../models/user.model.mjs";
import Role from "../models/role.model.mjs";
import APIError from "../../utils/errors.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";

export const create = async (data) => {
    const role = await Role.findOne({ name: data.role });
    if (!role) {
        // Using the unified response handler to send error response
        return res.respond(
            constants.BAD_REQUEST,
            getMessage("errors.invalidRole")
        );
    }
    data.role = { id: role._id, name: role.name };
    return await crudFactory.create(User)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(User)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(User)(id);
};

export const getAllUsers = async (options) => {
    return await crudFactory.getAll(User)(options);
    // return getUsersWithStructure(page, pageSize);
};

export const deleteDoc = async (id, req) => {
    // Find the user first
    const user = await User.findById(id);
    if (!user) {
        throw new APIError({
            message: getMessage("errors.not_found", req),
            status: constants.NOT_FOUND,
        });
    }

    // Perform a soft delete by setting 'deletedAt'
    user.deletedAt = new Date();
    await user.save();

    return user;
};
