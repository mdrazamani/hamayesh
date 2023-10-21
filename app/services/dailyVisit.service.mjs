import DailyVisit from "../models/dailyVisit.model.mjs";

export const getVisitsForPeriod = async (startDate, endDate) => {
    const visits = await DailyVisit.find({
        date: {
            $gte: startDate,
            $lt: endDate,
        },
    });

    return visits.reduce((total, record) => total + record.visits, 0);
};
