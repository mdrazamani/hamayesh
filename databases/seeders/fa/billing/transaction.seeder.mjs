import mongoose from "mongoose";
import Transaction from "../../../../app/models/billing/transaction.model.mjs";

// Function to generate a random ObjectId
const generateObjectId = () => {
    return new mongoose.Types.ObjectId();
};

// Function to generate a random authority code
const generateAuthorityCode = () => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 36; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

// Function to generate a random refId
const generateRefId = () => {
    return `REF${Math.floor(100000 + Math.random() * 900000)}`;
};

// Function to randomly pick a status
const pickRandomStatus = () => {
    const statuses = ["completed", "pending", "failed"];
    return statuses[Math.floor(Math.random() * statuses.length)];
};

const seedTransactions = async () => {
    const transactions = [];
    for (let i = 0; i < 10; i++) {
        // Generate 10 transactions
        transactions.push({
            invoice: generateObjectId(),
            refId: generateRefId(),
            getway: generateObjectId(),
            authorityCode: generateAuthorityCode(),
            status: pickRandomStatus(),
        });
    }

    await Transaction.deleteMany({});
    const createdTransactions = await Transaction.insertMany(transactions);
    console.log("Transactions seeded successfully");
    return createdTransactions;
};

export const seedTransactionDatabase = async () => {
    try {
        await seedTransactions();
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Database seeding error", error);
        throw error;
    }
};
