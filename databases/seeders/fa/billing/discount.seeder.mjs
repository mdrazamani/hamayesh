import Discount from "../../../../app/models/billing/discount.model.mjs";

const generateDiscountCode = () => {
    let code = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code.toLowerCase();
};

const seedDiscounts = async () => {
    const discounts = [
        {
            amount: 10,
            type: "article",
            code: generateDiscountCode(),
            expiresAt: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
        },
        {
            percent: 15,
            type: "freeRegistration",
            code: generateDiscountCode(),
            expiresAt: new Date(new Date().getTime() + 72 * 60 * 60 * 1000),
        },
    ];

    await Discount.deleteMany({});
    const createdDiscounts = await Discount.insertMany(discounts);
    console.log("Discounts seeded successfully");
    return createdDiscounts;
};

export const seedDiscountDatabase = async () => {
    try {
        await seedDiscounts();
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Database seeding error", error);
        throw error;
    }
};
