import { Language } from "../../config/index.mjs";

// languageMiddleware.mjs
export let currentLanguage = Language;
const isValidLanguage = (lang) => ["fa", "en"].includes(lang);
export const languageMiddleware = (req, res, next) => {
    // Use 'Accept-Language' from the request headers
    const lang = req.header("Accept-Language");
    if (lang) {
        currentLanguage = lang;
        if (!isValidLanguage(lang)) {
            currentLanguage = Language;
        }
    }
    next();
};
