import crudFactory from "../../../utils/crudFactory.mjs";
import Transaction from "../../models/billing/transaction.model.mjs";

const populateOptions = [
    {
        path: "invoice",
    },
    {
        path: "gateway",
    },
];

export const create = async (data) => {
    return await crudFactory.create(Transaction)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Transaction)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Transaction)(id, {
        populate: populateOptions,
    });
};

export const getByInvoice = async (invoiceId) => {
    return await Transaction.findOne({
        invoice: invoiceId,
        status: { $in: ["pending", "completed"] },
    });
};

export const getByAuthority = async (authority) => {
    return await Transaction.findOne({ authorityCode: authority });
};
export const getByRefId = async (refId) => {
    return await Transaction.findOne({ refId });
};

export const getAll = async (options) => {
    const query = {
        ...options,
        populate: populateOptions,
    };
    return await crudFactory.getAll(Transaction)(query);
};
export const deleteDoc = async (id) => {
    return await crudFactory.delete(Transaction)(id);
};
