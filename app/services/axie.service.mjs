// userService.mjs

import { getMessage } from "../../config/i18nConfig.mjs";
import crudFactory from "../../utils/crudFactory.mjs";
import APIError from "../../utils/errors.mjs";
import Axie from "../models/axie.model.mjs";

export const create = async (data) => {
    if (data.parent) {
        console.log(Object(data.parent));
        const parent = await Axie.findOne({ _id: data.parent });
        data.level = parent.level + 1;
    }

    return await crudFactory.create(Axie)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Axie)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Axie)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(Axie)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Axie)(id);
};

export const getAllGrouped = async () => {
    try {
        const stages = [
            {
                $match: {
                    parent: null,
                },
            },
            {
                $graphLookup: {
                    from: "axies",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parent",
                    as: "children",
                    depthField: "level",
                    restrictSearchWithMatch: {},
                },
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    level: 1,
                    children: 1,
                },
            },
        ];

        const groupedAxies = await Axie.aggregate(stages);

        return groupedAxies;
    } catch (error) {
        throw new APIError(
            getMessage("errors.getAllGrouped"),
            constants.BAD_REQUEST
        );
    }
};
