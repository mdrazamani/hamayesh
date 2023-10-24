import DailyVisit from "../../app/models/dailyVisit.model.mjs"; // Update with your actual file path

export const seedDailyVisit = async () => {
    const date = new Date();
    const visitsData = Array.from({ length: 10 }, (_, i) => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - i); // Subtract 'i' days from the current date
    });
    try {
        // Insert the seed data into the database
        await DailyVisit.deleteMany({});
        await DailyVisit.insertMany(visitsData);
        console.log("Daily visits data has been successfully seeded.");
    } catch (error) {
        console.error("An error occurred while seeding the data:", error);
    }
};
