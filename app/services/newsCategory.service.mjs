// userService.mjs

import mongoose from "mongoose";
const { Types } = mongoose;

import { getMessage } from "../../config/i18nConfig.mjs";
import crudFactory from "../../utils/crudFactory.mjs";
import APIError from "../../utils/errors.mjs";
import NewsCategory from "../models/newsCategory.model.mjs";
import { loadLanguageSetting } from "../../config/readLang.mjs";

const lang = await loadLanguageSetting();

export const create = async (data) => {
    // if (data.parent) {
    //     console.log(Object(data.parent));
    //     const parent = await NewsCategory.findOne({ _id: data.parent });
    //     data.level = parent.level + 1;
    // }

    return await crudFactory.create(NewsCategory)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(NewsCategory)(id, data);
};

export const get = async (id) => {
    if (Types.ObjectId.isValid(id))
        return await crudFactory.get(NewsCategory)(id);
    else return await crudFactory.getBySlug(NewsCategory)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(NewsCategory)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(NewsCategory)(id);
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
                    from: "newscategories",
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
                    title: `$${lang}.title`,
                    description: `$${lang}.description`,
                    level: 1,
                    children: {
                        $map: {
                            input: "$children",
                            as: "child",
                            in: {
                                title: `$$child.${lang}.title`,
                                description: `$$child.${lang}.description`,
                                level: "$$child.level",
                                image: "$$child.image",
                                slug: "$$child.slug",
                            },
                        },
                    },
                    image: 1,
                    slug: 1,
                },
            },
        ];

        const groupedNewsCategories = await NewsCategory.aggregate(stages);

        return groupedNewsCategories;
    } catch (error) {
        throw new APIError(
            getMessage("errors.getAllGrouped"),
            constants.BAD_REQUEST
        );
    }
};
