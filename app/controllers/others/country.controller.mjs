// controllers/country.controller.js

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import City from "../../models/city.model.mjs";
import Country from "../../models/country.model.mjs";
import State from "../../models/state.model.mjs";

export const getAllCountries = async (req, res, next) => {
    try {
        const countries = await Country.find();
        return res.respond(
            constants.CREATED,
            getMessage("success.success"),
            countries
        );
    } catch (error) {
        next(error);
    }
};

export const getAllSates = async (req, res, next) => {
    try {
        const states = await State.find();
        return res.respond(
            constants.CREATED,
            getMessage("success.success"),
            states
        );
    } catch (error) {
        next(error);
    }
};

export const getCitiesByState = async (req, res, next) => {
    const { stateId } = req.params; // this will extract 'stateId' from the URL

    try {
        const cities = await City.find({ state: stateId });
        return res.respond(
            constants.CREATED,
            getMessage("success.success"),
            cities
        );
    } catch (error) {
        next(error);
    }
};

// ... Add other CRUD operations here
