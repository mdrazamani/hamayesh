// sliderService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import Slider from "../models/silder.model.mjs";

export const createSlider = async (data) => {
    // Here you can handle any pre-save logic, validation, or verification
    return await crudFactory.create(Slider)(data);
};

export const updateSlider = async (id, data) => {
    // Here you can handle any pre-update logic, validation, or verification
    return await crudFactory.update(Slider)(id, data);
};

export const getSlider = async (id) => {
    // If you need to populate or perform any complex queries, you can do it here
    return await crudFactory.get(Slider)(id);
};

export const getAllSliders = async (options) => {
    // Include any specific conditions or transformations for the query
    return await crudFactory.getAll(Slider)(options);
};

export const deleteSlider = async (id) => {
    return await crudFactory.delete(Slider)(id);
};
