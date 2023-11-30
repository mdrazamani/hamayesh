import Pricing from "../../../../app/models/billing/pricing.model.mjs";
import PricingRule from "../../../../app/models/billing/pricingRule.model.mjs";

const seedPricingRules = async () => {
    const rules = [
        {
            fa: {
                name: "قاعده 1",
                description: "توضیح 1 - بدون هوش مصنوعی",
            },
            en: {
                name: "Rule1",
                description: "Description1 - no ai",
            },
            number: 1,
            price: 100,
        },
        {
            fa: {
                name: "قاعده 2",
                description: "توضیح 2 - بدون هوش مصنوعی",
            },
            en: {
                name: "Rule2",
                description: "Description2 - no ai",
            },
            number: 2,
            price: 200,
        },
        {
            fa: {
                name: "قاعده 3",
                description: "توضیح 3 - اضافی",
            },
            en: {
                name: "Rule3",
                description: "Description3 - extra",
            },
            number: 3,
            price: 800,
            additionalInfo: {
                number: true,
                price: 80,
            },
        },
        {
            fa: {
                name: "قاعده 4",
                description: "توضیح 4 - همه همین قیمت",
            },
            en: {
                name: "Rule4",
                description: "Description4 - all the same price",
            },
            price: 500,
        },
        {
            fa: {
                name: "قاعده 5",
                description: "توضیح 5 - از 5 به بعد",
            },
            en: {
                name: "Rule5",
                description: "Description5 - from 5 onwards",
            },
            price: 200,
        },
        {
            fa: {
                name: "قاعده 6",
                description: "توضیح 6 - هر تعداد که بخواهید همین است",
            },
            en: {
                name: "Rule6",
                description: "Description6 - any quantity same price",
            },
            additionalInfo: {
                number: true,
                price: 200,
            },
        },
    ];

    await PricingRule.deleteMany({});
    const createdRules = await PricingRule.insertMany(rules);
    console.log("Pricing rules seeded successfully");
    return createdRules;
};

const seedPricing = async (rules) => {
    const pricings = [
        {
            type: "article",
            rules: [
                rules[0]._id,
                rules[1]._id,
                rules[2]._id,
                rules[3]._id,
                rules[4]._id,
                rules[5]._id,
            ],
        },
        {
            type: "freeRegistration",
            rules: [rules[0]._id],
        },
        // Add more pricing types as needed...
    ];

    await Pricing.deleteMany({});
    const createdPricings = await Pricing.insertMany(pricings);
    console.log("Pricing seeded successfully");
    return createdPricings;
};

export const seedPricingDatabase = async () => {
    try {
        const createdRules = await seedPricingRules();
        await seedPricing(createdRules);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Database seeding error", error);
        throw error;
    }
};
