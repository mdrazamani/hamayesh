// Country Schema
import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // other fields like country code, etc.
});

const Country = mongoose.model("Country", countrySchema);

export default Country;
