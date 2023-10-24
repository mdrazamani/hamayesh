import EventLog from "../../app/models/eventLog.model.mjs";

export const seedEventLog = async () => {
    const eventLogs = [
        {
            collectionName: "supporters",
            userId: "",
            action: "create",
            description: "add a supporter",
            date: Date.now(),
        },
    ];

    try {
        await EventLog.deleteMany({});
        await EventLog.insertMany(eventLogs);
        console.log("EventLog seeded successfully!");
    } catch (error) {
        console.error("Error seeding EventLog:", error);
    }
};
