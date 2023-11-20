import { Language } from "./index.mjs";
import { currentLanguage } from "../app/middlewares/languageMiddleware.mjs";

export const loadLanguageSetting = () => {
    return currentLanguage || Language;
};
