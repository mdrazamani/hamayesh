// Importing the necessary libraries
import mongoose from "mongoose";

// Define the schema for our city data
const citySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // defining the type of _id as ObjectId
    city: {
        type: String,
        required: true, // this makes the 'city' field mandatory
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State", // assuming your state model is named 'State'
        required: true, // this makes the 'state' field mandatory
    },
    // You can add additional fields here if your data has more fields
});

// Create the model from the schema (City is the collection name here)
const City = mongoose.model("City", citySchema);

citySchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted.__v; // if you want to remove the version key
        delete converted.state; // if you want to remove the version key
    },
});

// Export the model
export default City;
