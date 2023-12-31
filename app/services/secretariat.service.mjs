// secretariatService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import Secretariat from "../models/secretariat.model.mjs"; // Please adjust the path to your actual secretariat model file

const populateOptions = [
    {
        path: "users", // This time, we are populating 'users', not 'user'
        select: "fa.firstName fa.lastName en.firstName en.lastName id profileImage -state -city", // excluding MongoDB's internal field '__v'
    },
    {
        path: "boss",
        select: "fa.firstName fa.lastName en.firstName en.lastName id profileImage -state -city",
    },
];
export const createSecretariat = async (data) => {
    // Here you can handle any pre-save logic, validation, or verification
    return await crudFactory.create(Secretariat)(data);
};

export const updateSecretariat = async (id, data) => {
    // Here you can handle any pre-update logic, validation, or verification
    return await crudFactory.update(Secretariat)(id, data);
};

export const getSecretariat = async (id) => {
    // Define population options for the 'users' field

    // Pass the populate options to the get method
    return await crudFactory.get(Secretariat)(id, {
        populate: populateOptions,
    });
};

export const getAllSecretariats = async (options) => {
    // Define population options for the 'users' field
    // Include population options in the parameters passed to the factory method
    const modifiedOptions = {
        ...options,
        populate: populateOptions, // add populate here
    };

    return await crudFactory.getAll(Secretariat)(modifiedOptions);
};

export const deleteSecretariat = async (id) => {
    return await crudFactory.delete(Secretariat)(id);
};
