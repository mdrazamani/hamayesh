import mongoose from "mongoose";

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
            required: true,
        },
        enTitle: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        iscCode: {
            type: String,
            required: true,
        },
        aboutHtml: {
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

hamayeshDetailSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;

        if (
            converted.eventAddress.state &&
            converted.eventAddress.state.state
        ) {
            converted.eventAddress.state = converted.eventAddress.state.state;
        }

        if (converted.eventAddress.city && converted.eventAddress.city.city) {
            converted.eventAddress.city = converted.eventAddress.city.city;
        }

        // Remove _id from writingArticles.files
        if (converted.writingArticles && converted.writingArticles.files) {
            converted.writingArticles.files.forEach((file) => {
                delete file._id;
            });
        }
    },
});

const HamayeshDetail = mongoose.model("HamayeshDetail", hamayeshDetailSchema);

export default HamayeshDetail;
