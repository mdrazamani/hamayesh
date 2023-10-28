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

export const getAllOrganazers = async (options) => {
    const populateOptions = [
        {
            path: "details.address.state",
            model: "State",
            select: "state -_id",
        },
        {
            path: "details.address.city",
            model: "City",
            select: "city -_id",
        },
    ];

    const modifiedOptions = {
        ...options,
        populate: populateOptions,
    };

    return await crudFactory.getAll(Organizer)(modifiedOptions);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Organizer)(id);
};
