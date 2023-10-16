import { getMessage } from "../config/i18nConfig.mjs";
import constants from "./constants.mjs";
import APIError from "./errors.mjs";

export const paginate = async (Model, page = 1, pageSize = 10, query = {}) => {
    try {
        const skip = (page - 1) * pageSize;
        const items = await Model.find(query).skip(skip).limit(pageSize);
        const total = await Model.count(query);

        return {
            items,
            total,
            pages: Math.ceil(total / pageSize),
            currentPage: page,
        };
    } catch (error) {
        throw new APIError({
            message: getMessage("errors.during_pagination"),
            status: constants.BAD_REQUEST,
        });
    }
};
