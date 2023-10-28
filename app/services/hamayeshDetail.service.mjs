// userService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import HamayeshDetail from "../models/hamayeshDetail.model.mjs";

export const update = async (id, data) => {
    return await crudFactory.update(HamayeshDetail)(id, data);
};

export const get = async () => {
    // return await crudFactory.get(HamayeshDetail)(id);
    const populateOptions = [
        {
            path: "eventAddress.state",
            model: "State",
            select: "state -_id",
        },
        {
            path: "eventAddress.city",
            model: "City",
            select: "city -_id",
        },
    ];
    return await HamayeshDetail.findOne().populate(populateOptions);
};
