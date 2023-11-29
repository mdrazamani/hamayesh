import crudFactory from "../../../utils/crudFactory.mjs";
import Pricing from "../../models/billing/pricing.model.mjs";

import { create as RuleCreate } from "./pricingRule.service.mjs";
import { update as RuleUpdate } from "./pricingRule.service.mjs";
import { deleteDoc as RuleDeleteDoc } from "./pricingRule.service.mjs";

const populateOptions = {
    path: "rules",
    model: "pricingRule",
    select: `-__v`, // excluding MongoDB's internal field '__v'
}; //-__v

export const create = async (data) => {
    const arrayRules = [];
    const rules = data.rules;
    for (const rule of rules) {
        const createdData = await RuleCreate(rule);
        arrayRules.push(createdData._id);
    }
    data.rules = arrayRules;

    return await crudFactory.create(Pricing)(data);
};

export const update = async (id, data) => {
    try {
        const existingPricing = await get(id);
        const existingRulesSet = new Set(
            existingPricing && existingPricing.rules
                ? existingPricing.rules.map((rule) => rule._id.toString())
                : []
        );

        const updatedRules = data.rules || [];
        const updatedRuleIdsSet = new Set(
            updatedRules.map((rule) => rule._id).filter((id) => id)
        );

        for (const ruleId of existingRulesSet) {
            if (!updatedRuleIdsSet.has(ruleId)) {
                await RuleDeleteDoc(ruleId);
            }
        }

        const arrayRules = [];
        for (const rule of updatedRules) {
            if (rule._id && existingRulesSet.has(rule._id)) {
                await RuleUpdate(rule._id, rule);
                arrayRules.push(rule._id);
            } else if (!rule._id) {
                const createdRule = await RuleCreate(rule);
                arrayRules.push(createdRule._id);
            }
        }

        data.rules = arrayRules;

        return await crudFactory.update(Pricing)(id, data);
    } catch (error) {
        console.error("Error in updating Pricing:", error);
        throw error;
    }
};

export const get = async (id) => {
    return await crudFactory.get(Pricing)(id, { populate: populateOptions });
};

export const getAll = async (options) => {
    const modifiedOptions = {
        ...options,
        populate: populateOptions, // add populate here
    };

    return await crudFactory.getAll(Pricing)(modifiedOptions);
};

export const deleteDoc = async (id) => {
    const pricing = await get(id);
    if (pricing && pricing.rules) {
        for (const ruleId of pricing.rules) {
            await RuleDeleteDoc(ruleId);
        }
    }

    return await crudFactory.delete(Pricing)(id);
};
