// userService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import HamayeshDetail from "../models/hamayeshDetail.model.mjs";

export const update = async (id, data) => {
    return await crudFactory.update(HamayeshDetail)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(HamayeshDetail)(id);
};
