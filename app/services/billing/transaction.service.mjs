import crudFactory from "../../../utils/crudFactory.mjs";
import Transaction from "../../models/billing/transaction.model.mjs";

const populateOptions = [
    {
        path: "invoice",
    },
    {
        path: "getway",
    },

    // If there are any other reference fields, add them here similarly
];

export const create = async (data) => {
    return await crudFactory.create(Transaction)(data);
};

export const get = async (id) => {
    return await crudFactory.get(Transaction)(id, {
        populate: populateOptions,
    });
};

export const getByAuthority = async (authority) => {
    return await Transaction.findOne({ authorityCode: authority });
};

export const getAll = async (options, userId) => {
    const query = {
        ...options,
        populate: populateOptions,
    };

    if (userId) {
        // Assuming the invoice model has a 'user' field that stores the user ID
        query.populate.match = { user: userId };
    }

    return await crudFactory.getAll(Transaction)(query);
};
export const deleteDoc = async (id) => {
    return await crudFactory.delete(Transaction)(id);
};
