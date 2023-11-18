import { Language } from "./index.mjs";
import { promises as fs } from "fs";
import { createPath } from "./tools.mjs";

const configFile = createPath("config.json");
const defaultLanguage = Language;

export const loadLanguageSetting = async () => {
    try {
        let configExists = true;

        try {
            await fs.access(configFile);
        } catch (err) {
            configExists = false;
        }

        if (!configExists) {
            await fs.writeFile(
                configFile,
                JSON.stringify({ language: defaultLanguage })
            );
        }

        const config = JSON.parse(await fs.readFile(configFile, "utf-8"));

        return config.language || defaultLanguage;
    } catch (err) {
        console.error("Error reading or creating language setting:", err);
        return defaultLanguage;
    }
};
