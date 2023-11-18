export const toJSON = (doc, converted, lang, modelLangFields) => {
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

export const addVirtualFields = (schema, lang, modelLangFields) => {
    Object.keys(modelLangFields).forEach((field) => {
        schema
            .virtual(field)
            .get(function () {
                return this[lang] && this[lang][field];
            })
            .set(function (value) {
                if (!this[lang]) {
                    this[lang] = {};
                }
                this[lang][field] = value;
            });
    });
};

export const processLanguageFieldsInUpdate = (
    update,
    lang,
    modelLangFields
) => {
    let isModified = false;

    Object.keys(modelLangFields).forEach((field) => {
        if (update[field] != null) {
            if (!update[lang]) update[lang] = {};
            update[lang][field] = update[field];
            delete update[field];
            isModified = true;
        }
    });

    return isModified;
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
