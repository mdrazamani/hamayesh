// userService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import Organizer from "../models/organizer.model.mjs";

export const create = async (data) => {
    return await crudFactory.create(Organizer)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Organizer)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Organizer)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(Organizer)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Organizer)(id);
};
