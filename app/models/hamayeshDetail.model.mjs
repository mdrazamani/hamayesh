import mongoose from "mongoose";

import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = await loadLanguageSetting();

const ArticleFormats = [
    "pdf", // PDF
    "doc", // Microsoft Word
    "docx", // Microsoft Word (newer format)
    "ppt", // Microsoft PowerPoint
    "pptx", // Microsoft PowerPoint (newer format)
    "odt", // OpenDocument Text
    "ods", // OpenDocument Spreadsheet
    "odp", // OpenDocument Presentation
    "rtf", // Rich Text Format
    "txt", // Plain text
    "xls", // Microsoft Excel
    "xlsx", // Microsoft Excel (newer format)
    "tex", // LaTeX
    "epub", // Electronic publication (eBook format)
];

const hamayeshDetailSchema = new mongoose.Schema(
    {
        faTitle: {
            type: String,
        },
        enTitle: {
            type: String,
        },
        fa: {
            description: {
                type: String,
            },
            aboutHtml: {
                type: String,
            },
            writingArticles: {
                description: {
                    type: String,
                },
                files: [
                    {
                        title: {
                            type: String,
                        },
                        image: {
                            type: String,
                        },
                        format: {
                            type: String,
                            enum: ArticleFormats,
                        },
                        description: {
                            type: String,
                        },
                        path: {
                            type: String,
                        },
                    },
                ],
            },
        },
        en: {
            description: {
                type: String,
            },
            aboutHtml: {
                type: String,
            },
            writingArticles: {
                description: {
                    type: String,
                },
                files: [
                    {
                        title: {
                            type: String,
                        },
                        image: {
                            type: String,
                        },
                        format: {
                            type: String,
                            enum: ArticleFormats,
                        },
                        description: {
                            type: String,
                        },
                        path: {
                            type: String,
                        },
                    },
                ],
            },
        },
        iscCode: {
            type: String,
        },
        poster: {
            type: String,
        },
        headerImage: {
            type: String,
        },
        eventAddress: {
            state: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "State",
            },
            city: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "City",
            },
            address: {
                type: String,
                required: true,
                trim: true,
            },
            longitude: {
                type: Number,
            },
            latitude: {
                type: Number,
            },
        },
        dates: {
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
            },
            startArticle: {
                type: Date,
            },
            endArticle: {
                type: Date,
            },
            refeeResult: {
                type: Date,
            },
            editArticle: {
                type: Date,
            },
            lastRegistration: {
                type: Date,
            },
        },
    },
    { timestamps: true }
);

addVirtualFields(hamayeshDetailSchema, lang, hamayeshDetailSchema.obj.fa);

hamayeshDetailSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;

        //multiLanguage
        toJSON(doc, converted, lang, hamayeshDetailSchema.obj.fa);

        if (
            converted.eventAddress.state &&
            converted.eventAddress.state.state
        ) {
            converted.eventAddress.state = converted.eventAddress.state.state;
        }

        if (converted.eventAddress.city && converted.eventAddress.city.city) {
            converted.eventAddress.city = converted.eventAddress.city.city;
        }

        if (!doc[lang].writingArticles?.description) {
            const altLang = lang === "fa" ? "en" : "fa";
            converted.writingArticles = doc[altLang].writingArticles;
        }

        // Remove _id from writingArticles.files
        if (converted.writingArticles && converted.writingArticles.files) {
            converted.writingArticles.files.forEach((file) => {
                delete file._id;
            });
        }
    },
});

hamayeshDetailSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, hamayeshDetailSchema.obj.fa);
    next();
});

hamayeshDetailSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, hamayeshDetailSchema.obj.fa);
    next();
});

const HamayeshDetail = mongoose.model("HamayeshDetail", hamayeshDetailSchema);

export default HamayeshDetail;
