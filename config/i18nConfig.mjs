import i18n from "i18n";

i18n.configure({
  locales: ["en", "fa"],
  directory: "./public/locales",
  defaultLocale: "en",
  objectNotation: true,
  register: global,
  header: "accept-language",
});

export const setLocaleMiddleware = (req, res, next) => {
  const lang = req.headers["accept-language"] || "en";
  i18n.setLocale(req, lang);
  next();
};

/**
 * Fetches the localized message based on the provided key.
 * @param {string} key - The key to fetch the message for.
 * @returns {string} - The localized message.
 */
export function getMessage(key, req = null) {
  if (req) {
    return req.__(key);
  }
  return i18n.__(key);
}
export default i18n;
