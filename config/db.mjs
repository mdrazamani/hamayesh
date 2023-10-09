import mongoose from "mongoose";
import { dbURI } from "./index.mjs";
// import User from "../app/models/user.model.mjs";
// import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default () => {
    mongoose
        .connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(async () => {
            console.log("Connected to MongoDB");

            // Dynamically import all models and create collections

            // const modelsPath = path.join(__dirname, "../app/models"); // Adjust the path accordingly

            // const modelFiles = fs
            //     .readdirSync(modelsPath)
            //     .filter((file) => file.endsWith(".mjs")); // Assuming your models are .mjs files

            // for (const file of modelFiles) {
            //     const { collectionName } = await import(
            //         `file://${path.join(modelsPath, file)}`
            //     );

            //     if (collectionName) {
            //         mongoose.connection.db.createCollection(
            //             collectionName.toLowerCase(),
            //             (err, collection) => {
            //                 if (err) {
            //                     console.error(
            //                         `Error creating '${collectionName}' collection:`,
            //                         err
            //                     );
            //                 } else {
            //                     console.log(
            //                         `'${collectionName}' collection created successfully`
            //                     );
            //                 }
            //             }
            //         );
            //     }
            // }
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
};
