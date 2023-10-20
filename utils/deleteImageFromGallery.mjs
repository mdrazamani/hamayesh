import fs from "fs/promises";
import path from "path";
import constants from "./constants.mjs";
import { getMessage } from "../config/i18nConfig.mjs";
import APIError from "./errors.mjs";
import Gallery from "../app/models/gallery.model.mjs";

// Helper function to delete a file
export const deleteFile = async (filePath) => {
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error(`Failed to delete file at ${filePath}: `, error);
        // Handle the error appropriately (e.g., you might want to throw an exception)
        throw new Error(`Failed to delete file: ${error.message}`);
    }
};
