import DailyVisit from "../app/models/dailyVisit.model.mjs";
import { CronJob } from "cron";

export function resetAndSaveDailyVisits(state) {
    const timeZone = "Asia/Tehran";
    const cronSchedule = "0 0 * * *";

    new CronJob(
        cronSchedule,
        async function () {
            if (state.dailyVisits > 0) {
                try {
                    const newRecord = new DailyVisit({
                        date: new Date(),
                        visits: state.dailyVisits,
                    });

                    await newRecord.save();
                    console.log("Daily visits have been saved successfully.");
                } catch (error) {
                    console.error(
                        "An error occurred while saving daily visits: ",
                        error
                    );
                }
            }

            state.dailyVisits = 0;
        },
        null,
        true,
        timeZone
    );
}
