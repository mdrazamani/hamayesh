import mongoose from "mongoose";

const getwaySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        uri: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        apiKey: {
            public: String,
            private: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        supportedCurrencies: [String],
        transactionReference: String,
        inputs: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
        },
        outputs: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
        },
    },
    { timestamps: true }
);

const Getway = mongoose.model("getway", getwaySchema);

export default Getway;
