import crudFactory from "../../utils/crudFactory.mjs";
import News from "../models/news.model.mjs";

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
    return await crudFactory.getAll(News)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(News)(id);
};

export const getSlug = async (slug) => {
    const populateOptions = [
        {
            path: "writer",
            model: "User",
            select: "-__v",
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

    const news = await crudFactory.getBySlug(News)(slug, {
        populate: populateOptions,
    });

    //await update(news._id, { $inc: { visitNumber: 1 } });
    update(news._id, { $inc: { visitNumber: 1 } });
    return news;
};
