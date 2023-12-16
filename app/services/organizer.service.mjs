// userService.mjs

import crudFactory from "../../utils/crudFactory.mjs";
import Organizer from "../models/organizer.model.mjs";

const populateOptions = [
    {
        path: "details.address.state",
        model: "State",
        select: "state -_id",
    },
    {
        path: "details.address.city",
        model: "City",
        select: "city -_id",
    },
];

export const create = async (data) => {
    return await crudFactory.create(Organizer)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Organizer)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Organizer)(id);
};

export const getMain = async () => {
    const main = await Organizer.findOne({ isMain: true })
        .select(
            "name description logo details.address details.emails details.phoneNumbers"
        )
        .populate(populateOptions)
        .exec();

    return {
        name: main?.name,
        description: main?.description,
        logo: main?.logo,
        details: {
            address: `${main?.details?.address?.state}-${main?.details?.address?.city} ${main?.details?.address?.address}`,
            email:
                main?.details?.emails.length > 0
                    ? main?.details?.emails[0]
                    : null,
            phoneNumber:
                main?.details?.phoneNumbers.length > 0
                    ? main?.details?.phoneNumbers[0]
                    : null,
        },
    };
};

export const getAll = async (options) => {
    return await crudFactory.getAll(Organizer)(options);
};

export const getAllOrganazers = async (options) => {
    const modifiedOptions = {
        ...options,
        populate: populateOptions,
    };

    return await crudFactory.getAll(Organizer)(modifiedOptions);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Organizer)(id);
};
