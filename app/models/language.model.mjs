import mongoose from "mongoose";

export const LocalizedStringSchema = new mongoose.Schema(
    {
        en: { type: String, required: true }, // English
        fa: { type: String, required: true }, // Persian
        // Add other languages as needed
    },
    { _id: false }
); // Disable _id for subdocument
