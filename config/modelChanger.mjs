import { loadLanguageSetting } from "./readLang.mjs";

export const toJSON = (doc, converted, modelLangFields) => {
    const lang = loadLanguageSetting();
    const otherLang = lang === "fa" ? "en" : "fa";

    Object.keys(modelLangFields).forEach((key) => {
        if (doc[lang][key]) {
            converted[key] = doc[lang][key];
        } else {
            converted[key] = doc[otherLang][key];
        }
    });

    delete converted.fa;
    delete converted.en;
};

export const addVirtualFields = (schema, modelLangFields) => {
    Object.keys(modelLangFields).forEach((field) => {
        schema
            .virtual(field)
            .get(function () {
                const lang = loadLanguageSetting(); // Load the setting here
                return this[lang] && this[lang][field];
            })
            .set(function (value) {
                const lang = loadLanguageSetting(); // Load the setting here
                if (!this[lang]) {
                    this[lang] = {};
                }
                this[lang][field] = value;
            });
    });
};

export const processLanguageFieldsInUpdate = (update, modelLangFields) => {
    const lang = loadLanguageSetting();

    const updateWithSet = {};

    Object.keys(update).forEach((field) => {
        if (Object.keys(modelLangFields).includes(field)) {
            updateWithSet[`${lang}.${field}`] = update[field];
        }
    });

    if (Object.keys(updateWithSet).length > 0) {
        update.$set = updateWithSet;
    }

    return Object.keys(updateWithSet).length > 0;
};

export const insertDocumentsDynamically = async (Model, data) => {
    const savedDocuments = [];

    for (const item of data) {
        const document = new Model(item);
        await document.save();
        savedDocuments.push(document);
    }

    return savedDocuments;
};
