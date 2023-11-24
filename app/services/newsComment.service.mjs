// userService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import NewsComment from "../models/newsComment.model.mjs";
import News from "../models/news.model.mjs";
import APIError from "../../utils/errors.mjs";
import constants from "../../utils/constants.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";
import { loadLanguageSetting } from "../../config/readLang.mjs";

export const create = async (data) => {
    const news = await News.findOne({ _id: data.newsId });

    let flag = true;
    for (const comment of news?.comments || []) {
        const newsComment = await NewsComment.findOne({ _id: comment });

        if (
            newsComment &&
            (newsComment.userIp == data.userIp ||
                newsComment.userEmail == data.userEmail)
        ) {
            flag = false;
            break;
        }
    }

    if (flag) {
        const entity = new NewsComment(data);

        const add = await entity.save();
        await crudFactory.addNested(News)(news._id, "comments", entity._id);
        return add;
    } else {
        throw new APIError({
            message: getMessage("errors.commentIsAre"),
            status: constants.BAD_REQUEST,
        });
    }
};

export const update = async (id, data) => {
    return await crudFactory.update(NewsComment)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(NewsComment)(id);
};

export const getAll = async (options) => {
    return await crudFactory.getAll(NewsComment)(options);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(NewsComment)(id);
};
