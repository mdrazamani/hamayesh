import crudFactory from "../../utils/crudFactory.mjs";
import News from "../models/news.model.mjs";

const populateOptions = [
    {
        path: "writer",
        model: "User",
        select: "fa.firstName fa.lastName en.firstName en.lastName id profileImage -city -state",
    },
    {
        path: "category",
        model: "NewsCategory",
        select: "-__v",
    },
    {
        path: "tags",
        model: "NewsTag",
        select: "-__v",
    },
    {
        path: "comments",
        model: "NewsComment",
        select: "-__v",
        match: { status: true },
    },
];

export const create = async (data, user) => {
    if (user) data.writer = user._id;
    return await crudFactory.create(News)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(News)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(News)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(News)({
        ...options,
        populate: populateOptions,
    });
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(News)(id);
};

export const getSlug = async (slug) => {
    const news = await crudFactory.getBySlug(News)(slug, {
        populate: populateOptions,
    });
    //await update(news._id, { $inc: { visitNumber: 1 } });
    update(news._id, { $inc: { visitNumber: 1 } });
    return news;
};

export const getBySlugOrId = async (slugOrId) => {
    let news;
    // Check if slugOrId is a valid ObjectId
    if (slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
        news = await crudFactory.get(News)(slugOrId, {
            populate: populateOptions,
        });
    } else {
        news = await crudFactory.getBySlug(News)(slugOrId, {
            populate: populateOptions,
        });
    }
    if (news) {
        update(news._id, { $inc: { visitNumber: 1 } });
    }
    return news;
};
