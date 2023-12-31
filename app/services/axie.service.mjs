import { getMessage } from "../../config/i18nConfig.mjs";
import crudFactory from "../../utils/crudFactory.mjs";
import APIError from "../../utils/errors.mjs";
import Axie from "../models/axie.model.mjs";
import constants from "../../utils/constants.mjs";
import { loadLanguageSetting } from "../../config/readLang.mjs";

export const create = async (data) => {
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
    const lang = loadLanguageSetting();
    try {
        const alternativeLang = lang === "fa" ? "en" : "fa";

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
                $unwind: {
                    path: "$children",
                    preserveNullAndEmptyArrays: true,
                },
            },

            {
                $match: {
                    $expr: {
                        $cond: {
                            if: { $ifNull: ["$children", false] },
                            then: {
                                $and: [
                                    { $eq: ["$children.parent", "$_id"] },
                                    { $ifNull: ["$children", true] },
                                ],
                            },
                            else: {
                                $or: [
                                    { $eq: ["$children.parent", "$_id"] },
                                    { $ifNull: ["$children", true] },
                                ],
                            },
                        },
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
                    title: {
                        $first: {
                            $ifNull: [
                                `$${lang}.title`,
                                `$${alternativeLang}.title`,
                            ],
                        },
                    },
                    description: {
                        $first: {
                            $ifNull: [
                                `$${lang}.description`,
                                `$${alternativeLang}.description`,
                            ],
                        },
                    },

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
                                title: {
                                    $ifNull: [
                                        `$$child.${lang}.title`,
                                        `$$child.${alternativeLang}.title`,
                                    ],
                                },
                                description: {
                                    $ifNull: [
                                        `$$child.${lang}.description`,
                                        `$$child.${alternativeLang}.description`,
                                    ],
                                },
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
                                            title: {
                                                $ifNull: [
                                                    `$$grandChild.${lang}.title`,
                                                    `$$grandChild.${alternativeLang}.title`,
                                                ],
                                            },
                                            description: {
                                                $ifNull: [
                                                    `$$grandChild.${lang}.description`,
                                                    `$$grandChild.${alternativeLang}.description`,
                                                ],
                                            },
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
                    // children: {
                    //     $cond: {
                    //         if: { $ne: [{ $size: "$children" }, 0] },
                    //         then: "$children",
                    //         else: "$$REMOVE",
                    //     },
                    // },

                    children: {
                        $cond: {
                            if: {
                                $and: [
                                    { $ne: [{ $size: "$children" }, 0] },
                                    {
                                        $ne: [
                                            { $arrayElemAt: ["$children", 0] },
                                            null,
                                        ],
                                    },
                                    {
                                        $ne: [
                                            {
                                                $arrayElemAt: [
                                                    "$children.level",
                                                    0,
                                                ],
                                            },
                                            null,
                                        ],
                                    },
                                ],
                            },
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
