import mongoose from "mongoose";
import Invoice from "../../../../app/models/billing/invoice.model.mjs";
import Transaction from "../../../../app/models/billing/transaction.model.mjs";
import Gateway from "../../../../app/models/billing/gateway.model.mjs";

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
    // Fetch 10 invoices and 1 gateway from the database
    const invoices = await Invoice.find().limit(10);
    const gateway = await Gateway.findOne(); // Assuming there's only one gateway

    if (!gateway || invoices.length < 10) {
        throw new Error(
            "Required invoices or gateway not found in the database"
        );
    }

    const transactions = [];
    for (let i = 0; i < 10; i++) {
        transactions.push({
            invoice: invoices[i % invoices.length]._id, // Rotate through the 10 invoices
            refId: generateRefId(),
            gateway: gateway._id, // Use the same gateway for all transactions
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
