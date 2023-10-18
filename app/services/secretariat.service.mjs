// secretariatService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import Secretariat from "../models/secretariat.model.mjs"; // Please adjust the path to your actual secretariat model file

export const createSecretariat = async (data) => {
    // Here you can handle any pre-save logic, validation, or verification
    return await crudFactory.create(Secretariat)(data);
};

export const updateSecretariat = async (id, data) => {
    // Here you can handle any pre-update logic, validation, or verification
    return await crudFactory.update(Secretariat)(id, data);
};

export const getSecretariat = async (id) => {
    return await crudFactory.get(Secretariat)(id);
};

export const getAllSecretariats = async (options) => {
    return await crudFactory.getAll(Secretariat)(options);
};

export const deleteSecretariat = async (id) => {
    return await crudFactory.delete(Secretariat)(id);
};
