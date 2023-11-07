// userService.mjs

import HamayeshDetail from "../models/hamayeshDetail.model.mjs";

export const update = async (data) => {
    return await HamayeshDetail.findOneAndUpdate(data);
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
