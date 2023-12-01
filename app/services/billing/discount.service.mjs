import crudFactory from "../../../utils/crudFactory.mjs";
import Discount from "../../models/billing/discount.model.mjs";

const populateOptions = [
    {
        path: "users",
        model: "User",
        select: `fa.firstName fa.lastName en.firstName en.lastName id profileImage -state -city`,
    },
    {
        path: "rules",
        model: "pricingRule",
        select: `-__V`,
    },
]; //-__v

export const create = async (data) => {
    if (data?.amount) {
        data.amount = Number(data?.amount);
        if (data?.amount && isNaN(data?.amount)) {
            throw new APIError({
                message: getMessage("your_number_is_not_valid"),
                status: 404,
            });
        }
    }

    if (data?.percent) {
        data.percent = Number(data?.percent);
        if (data?.percent && isNaN(data?.percent)) {
            throw new APIError({
                message: getMessage("your_number_is_not_valid"),
                status: 404,
            });
        }
    }

    return await crudFactory.create(Discount)(data);
};

export const update = async (id, data) => {
    return await crudFactory.update(Discount)(id, data);
};

export const get = async (id) => {
    return await crudFactory.get(Discount)(id, { populate: populateOptions });
};

export const getAll = async (options) => {
    const modifiedOptions = {
        ...options,
        populate: populateOptions, // add populate here
    };
    return await crudFactory.getAll(Discount)(modifiedOptions);
};

export const deleteDoc = async (id) => {
    return await crudFactory.delete(Discount)(id);
};

// export const applyDiscount = async (codes, userId, types = [], items = []) => {
//     let discounts = [];
//     for (const code of codes) {
//         let conditionObj = {};
//         if (!types.length && !items.length) {
//             conditionObj = {
//                 code: code,
//                 users: { $in: [userId] },
//                 activity: true,
//                 type: { $in: ["", null] },
//                 rules: { $size: 0 },
//             };
//         }

//         if (types.length) {
//             conditionObj = {
//                 code: code,
//                 users: { $in: [userId] },
//                 activity: true,
//                 rules: { $size: 0 },
//             };
//             if (types && types.length > 0) {
//                 conditionObj.type = { $in: types };
//             }
//         }

//         if (items.length) {
//             conditionObj = {
//                 code: code,
//                 users: { $in: [userId] },
//                 activity: true,
//                 type: { $in: ["", null] },
//             };
//             if (items && items.length > 0) {
//                 conditionObj.rules = { $in: items };
//             }
//         }

//         const discount = await Discount.find(conditionObj);
//         discounts.push(...discount);
//     }
//     if (discounts.length > 0) {
//         return discounts;
//     }
//     return [];
// };

export const applyDiscount = async (codes, userId, types = [], items = []) => {
    if (!codes.length) return []; // Return early if no codes are provided

    // Base condition shared across different scenarios
    let baseCondition = {
        code: { $in: codes },
        users: { $in: [userId] },
        activity: true,
    };

    // Additional conditions based on `types` and `items`
    if (types.length || items.length) {
        baseCondition.rules = items.length ? { $in: items } : { $size: 0 };
        baseCondition.type = types.length
            ? { $in: types }
            : { $in: ["", null] };
    } else {
        baseCondition.type = { $in: ["", null] };
        baseCondition.rules = { $size: 0 };
    }

    const discounts = await Discount.find(baseCondition);
    return discounts.length ? discounts : [];
};
