import mongoose from "mongoose";
import User from "../../app/models/user.model.mjs";

module.exports = {
    async up(db, client) {
        // Connect to mongoose
        await mongoose.connect(db.s.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Define the migration logic
        const users = await User.find();
        for (let user of users) {
            user.newField = "defaultValue"; // Replace with your migration logic
            await user.save();
        }
        console.log("Migration completed successfully!");

        // Close mongoose connection
        await mongoose.connection.close();
    },

    async down(db, client) {
        // Connect to mongoose
        await mongoose.connect(db.s.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Define the logic to revert the migration if needed
        const users = await User.find();
        for (let user of users) {
            delete user.newField;
            await user.save();
        }
        console.log("Migration reverted successfully!");

        // Close mongoose connection
        await mongoose.connection.close();
    },
};
