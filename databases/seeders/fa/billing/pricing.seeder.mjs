import Pricing from "../../../../app/models/billing/pricing.model.mjs";
import PricingRule from "../../../../app/models/billing/pricingRule.model.mjs";

const seedPricingRules = async () => {
    const rules = [
        {
            name: "Rule1",
            description: "Description1 - no ai",
            number: 1,
            price: 100,
        },
        {
            name: "Rule2",
            description: "Description2 - no ai",
            number: 2,
            price: 200,
        },

        {
            name: "Rule3",
            description: "Description3 - azafi",
            price: 80,
            additionalInfo: {
                AdditionalPrice: true,
            },
        },
        {
            name: "Rule4",
            description: "Description4 - hame hamin geimat",
            price: 500,
            additionalInfo: {
                FixedTotalPrice: true,
            },
        },
        {
            name: "Rule5",
            description: "Description5  - az 5 ta be baad ",
            number: 5,
            price: 200,
            additionalInfo: {
                FromThisNumber: true,
            },
        },
        {
            name: "Rule6",
            description: "Description6  -har chand ta bekhaie hamine",
            price: 200,
            additionalInfo: {
                FixedOnePrice: true,
            },
        },
        // Add more rules as needed...
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
