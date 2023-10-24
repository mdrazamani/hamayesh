import i18n from "i18n";
import { Language } from "./index.mjs";

const languages = ["en", "fa"];

i18n.configure({
    locales: languages,
    directory: "./public/locales",
    defaultLocale: Language,
    objectNotation: true,
    register: global,
    header: "accept-language",
});

export const setLocaleMiddleware = (req, res, next) => {
    const lang = req.headers["accept-language"] || "fa";

    // Check if the specified language is supported, if not, fall back to default
    if (!languages.includes(lang)) {
        i18n.setLocale(i18n.getLocale()); // fallback to default locale
    } else {
        i18n.setLocale(lang);
    }

    next();
};

/**
 * Fetches the localized message based on the provided key.
 * @param {string} key - The key to fetch the message for.
 * @returns {string} - The localized message.
 */
export function getMessage(key) {
    return i18n.__(key);
}
export default i18n;
