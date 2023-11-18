import { promises as fs } from "fs";
import { createPath } from "../../../config/tools.mjs";
import constants from "../../../utils/constants.mjs";
import { getMessage } from "../../../config/i18nConfig.mjs";

const isValidLanguage = (lang) => ["fa", "en"].includes(lang);

export const setLanguageController = async (req, res) => {
    try {
        const { language } = req.body;

        if (!isValidLanguage(language)) {
            return res.status(400).send({
                message: 'Invalid language code. Please use "fa" or "en".',
            });
        }

        const filePath = createPath("config.json");
        await fs.writeFile(filePath, JSON.stringify({ language }));

        res.respond(constants.OK, getMessage("success.success"), { language });
    } catch (err) {
        return next(err);
    }
};
