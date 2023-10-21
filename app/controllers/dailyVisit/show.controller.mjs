import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getVisitsForPeriod } from "../../services/dailyVisit.service.mjs";
import { state } from "../../../utils/visits.mjs";

export const getSpecificVisitsController = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const aWeekAgo = new Date(today);
        aWeekAgo.setDate(today.getDate() - 7);

        const aMonthAgo = new Date(today);
        aMonthAgo.setDate(today.getDate() - 30);

        const currentVisits = state.dailyVisits;

        const visitsYesterday = await getVisitsForPeriod(yesterday, today);
        const visitsLastWeek = await getVisitsForPeriod(aWeekAgo, today);
        const visitsLastMonth = await getVisitsForPeriod(aMonthAgo, today);

        const totalVisitsYesterday = visitsYesterday + currentVisits;
        const totalVisitsLastWeek = visitsLastWeek + currentVisits;
        const totalVisitsLastMonth = visitsLastMonth + currentVisits;

        res.respond(constants.OK, getMessage("success.success"), {
            today: currentVisits,
            yesterday: totalVisitsYesterday,
            lastWeek: totalVisitsLastWeek,
            lastMonth: totalVisitsLastMonth,
        });
    } catch (error) {
        return next(error);
    }
};
