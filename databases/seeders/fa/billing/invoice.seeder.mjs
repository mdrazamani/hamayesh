import Invoice from "../../../../app/models/billing/invoice.model.mjs";
import User from "../../../../app/models/user.model.mjs";
import PricingRule from "../../../../app/models/billing/pricingRule.model.mjs";
import Discount from "../../../../app/models/billing/discount.model.mjs";

const generateInvoiceNumber = () => {
    const length = Math.random() > 0.5 ? 8 : 9;
    let number = "";

    for (let i = 0; i < length; i++) {
        number += Math.floor(Math.random() * 10).toString();
    }

    return number;
};

const seedInvoices = async () => {
    const sampleUsers = await User.find().limit(10);
    const samplePricingRules = await PricingRule.find().limit(5);
    const sampleDiscounts = await Discount.find().limit(3);

    const items = samplePricingRules.map((rule) => {
        return { number: 5, item: rule._id };
    });

    const invoices = sampleUsers.map((user) => ({
        invoiceNumber: generateInvoiceNumber(),
        user: user._id,
        items: items,
        subtotal: 1000,
        discounts: sampleDiscounts.map((discount) => discount._id),
        total: 950,
        paymentStatus: "pending",
    }));

    await Invoice.deleteMany({});
    const createdInvoices = await Invoice.insertMany(invoices);
    console.log("Invoices seeded successfully");
    return createdInvoices;
};

export const seedInvoiceDatabase = async () => {
    try {
        await seedInvoices();
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Database seeding error", error);
        throw error;
    }
};
