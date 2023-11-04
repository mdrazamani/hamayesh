// userService.mjs

import { getMessage } from "../../config/i18nConfig.mjs";
import crudFactory from "../../utils/crudFactory.mjs";
import APIError from "../../utils/errors.mjs";
import Axie from "../models/axie.model.mjs";
import constants from "../../utils/constants.mjs";

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

export const getAllGrouped = async (options) => {
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
                    depthField: "depth",
                    restrictSearchWithMatch: {},
                },
            },
            {
                $unwind: "$children",
            },
            {
                $match: {
                    $expr: {
                        $eq: ["$children.parent", "$_id"],
                    },
                },
            },
            {
                $sort: {
                    "children.createdAt": -1,
                },
            },
            {
                $graphLookup: {
                    from: "axies",
                    startWith: "$children._id",
                    connectFromField: "_id",
                    connectToField: "parent",
                    as: "children.children",
                    depthField: "childDepth",
                    restrictSearchWithMatch: {},
                },
            },
            {
                $sort: {
                    "children.children.createdAt": -1,
                },
            },
            {
                $group: {
                    _id: "$_id",
                    title: { $first: "$title" },
                    description: { $first: "$description" },
                    children: { $push: "$children" },
                },
            },
            {
                $addFields: {
                    children: {
                        $map: {
                            input: "$children",
                            as: "child",
                            in: {
                                _id: "$$child._id",
                                level: { $add: [1, "$$child.depth"] },
                                title: "$$child.title",
                                description: "$$child.description",
                                parent: "$$child.parent",
                                __v: "$$child.__v",
                                createdAt: "$$child.createdAt",
                                updatedAt: "$$child.updatedAt",
                                children: {
                                    $map: {
                                        input: "$$child.children",
                                        as: "grandChild",
                                        in: {
                                            _id: "$$grandChild._id",
                                            level: {
                                                $add: [
                                                    2,
                                                    "$$grandChild.childDepth",
                                                ],
                                            },
                                            title: "$$grandChild.title",
                                            description:
                                                "$$grandChild.description",
                                            parent: "$$grandChild.parent",
                                            __v: "$$grandChild.__v",
                                            createdAt: "$$grandChild.createdAt",
                                            updatedAt: "$$grandChild.updatedAt",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    children: {
                        $cond: {
                            if: { $ne: [{ $size: "$children" }, 0] },
                            then: "$children",
                            else: "$$REMOVE",
                        },
                    },
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
