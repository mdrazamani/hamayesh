import mongoose from "mongoose";

const gatewaySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        privateCode: {
            type: String,
        },
        api: {
            request: {
                uri: {
                    type: String,
                    required: true,
                },
                method: {
                    type: String,
                    required: true,
                    default: "POST",
                },
                headers: {
                    type: Map,
                    of: String,
                },
                body: {
                    type: Map,
                    of: mongoose.Schema.Types.Mixed,
                },
                response: {
                    type: Map,
                    of: mongoose.Schema.Types.Mixed,
                },
            },
            ourRedirect: {
                parameter: {
                    type: Map,
                    of: mongoose.Schema.Types.Mixed,
                },
                queryStrings: {
                    type: Map,
                    of: mongoose.Schema.Types.Mixed,
                },
                url: {
                    type: String,
                },
            },
            redirectThem: {
                parameter: {
                    type: Map,
                    of: mongoose.Schema.Types.Mixed,
                },
                queryStrings: {
                    type: Map,
                    of: mongoose.Schema.Types.Mixed,
                },
                url: {
                    type: String,
                },
            },
            verify: {
                uri: {
                    type: String,
                    required: true,
                },
                method: {
                    type: String,
                    required: true,
                    default: "POST",
                },
                headers: {
                    type: Map,
                    of: String,
                },
                body: {
                    type: Map,
                    of: mongoose.Schema.Types.Mixed,
                },
                response: {
                    type: Map,
                    of: mongoose.Schema.Types.Mixed,
                },
                conditions: {
                    true: [
                        {
                            type: Map,
                            of: mongoose.Schema.Types.Mixed,
                        },
                    ],
                    false: [
                        {
                            type: Map,
                            of: mongoose.Schema.Types.Mixed,
                        },
                    ],
                },
            },
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        supportedCurrencies: [String],
    },
    { timestamps: true }
);

const Gateway = mongoose.model("gateway", gatewaySchema);

export default Gateway;
