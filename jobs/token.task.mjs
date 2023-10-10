// // tokenManager.mjs

// import cron from "node-cron";
// import Token from "../app/models/token.model.mjs";

// const deleteExpiredTokens = async () => {
//     console.log("Running a task to delete expired tokens.");

//     // Get the current date
//     const currentDate = new Date();

//     // Delete tokens where the expiresAt date is less than the current date
//     await Token.deleteMany({ expiresAt: { $lt: currentDate } });

//     console.log("Expired tokens have been deleted.");
// };

// // Schedule the task to run every day at 2:00 AM
// cron.schedule("0 2 * * *", deleteExpiredTokens);

// export { deleteExpiredTokens };
