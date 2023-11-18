// speakerService.mjs

import { loadLanguageSetting } from "../../config/readLang.mjs";
import crudFactory from "../../utils/crudFactory.mjs";
import Speaker from "../models/speakers.model.mjs";

const lang = await loadLanguageSetting();

export const createSpeaker = async (data) => {
    // Here you can handle any pre-save logic, validation, or verification
    return await crudFactory.create(Speaker)(data);
};

export const updateSpeaker = async (id, data) => {
    // Here you can handle any pre-update logic, validation, or verification
    return await crudFactory.update(Speaker)(id, data);
};

export const getSpeaker = async (id) => {
    // Define population options
    const populateOptions = {
        path: "user",
        select: `-__v`, // excluding MongoDB's internal field '__v'
    };

    // Pass the populate options to the get method
    return await crudFactory.get(Speaker)(id, { populate: populateOptions });
};

export const getAllSpeakers = async (options) => {
    // Define population options
    const populateOptions = {
        path: "user",
        select: `-__v`,
    };

    // Include population options in the parameters passed to the factory method
    const modifiedOptions = {
        ...options,
        populate: populateOptions, // add populate here
    };

    return await crudFactory.getAll(Speaker)(modifiedOptions);
};

export const deleteSpeaker = async (id) => {
    return await crudFactory.delete(Speaker)(id);
};
