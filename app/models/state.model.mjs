// Importing the necessary libraries
import mongoose from "mongoose";

// Define the schema for our state data
const stateSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // defining the type of _id as ObjectId
    state: {
        type: String,
        required: true, // this makes the 'state' field mandatory
    },
    // You can add additional fields here if your data has more fields
});

// Create the model from the schema (State is the collection name here)
const State = mongoose.model("State", stateSchema);

stateSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted.__v; // if you want to remove the version key
    },
});

// Export the model
export default State;
