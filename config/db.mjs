import mongoose from "mongoose";
import { dbURI } from "./index.mjs";

export default () => {
    mongoose
        .connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(async () => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
};
