import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import User from "../../models/user.model.mjs";
import { loadLanguageSetting } from "../../../config/readLang.mjs";

export const adminDashboardController = async (req, res, next) => {
    let language = loadLanguageSetting(); // or "fa", set this based on the 'Accept-Language' header in your application

    let pipeline = [
        { $match: { "role.name": { $ne: "admin" } } },
        { $group: { _id: "$role.name", count: { $sum: 1 } } },
    ];

    if (language === "fa") {
        pipeline.push({
            $addFields: {
                _id: {
                    $switch: {
                        branches: [
                            { case: { $eq: ["$_id", "user"] }, then: "کاربر" },
                            {
                                case: { $eq: ["$_id", "referee"] },
                                then: "داور",
                            },
                            {
                                case: { $eq: ["$_id", "executive"] },
                                then: "کاربر اجرایی",
                            },
                            {
                                case: { $eq: ["$_id", "scientific"] },
                                then: "کاربر علمی",
                            },
                            // Add more cases as needed
                        ],
                        default: "نقش نامعلوم", // Default case if none of the above matches
                    },
                },
            },
        });
    }

    try {
        // Perform all the aggregations in parallel for efficiency
        const [
            userCountByRole,
            userRegistrationOverTime,
            topCities,
            genderDistribution,
        ] = await Promise.all([
            User.aggregate(pipeline),
            User.aggregate([
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" },
                            day: { $dayOfMonth: "$createdAt" },
                        },
                        count: { $sum: 1 },
                    },
                },
            ]),
            User.aggregate([
                { $group: { _id: "$city", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }, // Top 10 cities
            ]),
            // Similar aggregation for states            User.aggregate([...]), // Your aggregation for Gender Distribution
            User.aggregate([
                { $group: { _id: "$gender", count: { $sum: 1 } } },
            ]),
        ]);

        res.respond(constants.OK, getMessage("success.success"), {
            userCountByRole,
            userRegistrationOverTime,
            topCities,
            genderDistribution,
        });
    } catch (error) {
        return next(error);
    }
};
