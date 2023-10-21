import mongoose from "mongoose";

const dailyVisitSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    visits: Number,
});

const DailyVisit = mongoose.model("DailyVisit", dailyVisitSchema);

export default DailyVisit;
