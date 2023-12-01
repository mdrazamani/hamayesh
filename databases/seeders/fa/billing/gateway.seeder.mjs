import Getway from "../../../../app/models/billing/gateway.model.mjs";

const seedGetways = async () => {
    const zarinpalGetways = [
        {
            name: "زرین پال",
            slug: "zarinpal",
            privateCode: "1344b5d4-0048-11e8-94db-005056a205be",
            api: {
                request: {
                    uri: "https://sandbox.zarinpal.com/pg/v4/payment/request.json",
                    method: "POST",
                    body: new Map([
                        ["merchant_id", "String"],
                        ["amount", "Integer"],
                        ["description", "String"],
                        ["callback_url", "String"],
                        ["metadata", "Array"],
                        ["mobile", "String"],
                        ["email", "String"],
                    ]),
                    response: new Map([
                        ["code", "Integer"],
                        ["message", "String"],
                        ["authority", "String"],
                        ["fee_type", "String"],
                        ["fee", "Integer"],
                    ]),
                },

                ourRedirect: {
                    parameter: new Map([["authority", "String"]]),
                    // queryStrings: new Map([["authority", "String"]]),
                    url: "https://sandbox.zarinpal.com/pg/StartPay/",
                },

                redirectThem: {
                    // parameter: new Map([["authority", "String"]]),
                    queryStrings: new Map([
                        ["Authority", "String"],
                        ["Status", "String"],
                    ]),
                    url: "https://www.mysite.com/",
                },

                verify: {
                    uri: "https://sandbox.zarinpal.com/pg/v4/payment/verify.json",
                    method: "POST",
                    body: new Map([
                        ["merchant_id", "String"],
                        ["amount", "Integer"],
                        ["authority", "String"],
                    ]),
                    response: new Map([
                        ["code", "Integer"],
                        ["message", "String"],
                        ["card_hash", "String"],
                        ["card_pan", "String"],
                        ["ref_id", "Integer"],
                        ["fee_type", "String"],
                        ["fee", "Integer"],
                    ]),
                    conditions: {
                        true: [
                            new Map([["code", "100"]]),
                            new Map([["code", "101"]]),
                        ],
                        // false: new Map([
                        //     ["code", "Integer"],
                        //     ["message", "String"],
                        // ]),
                    },
                },
            },
            isActive: false,
            supportedCurrencies: ["IRR"],
        },
    ];

    await Getway.deleteMany({});
    await Getway.insertMany(zarinpalGetways);
    console.log("Getways seeded successfully");
};

export const seedGetwayDatabase = async () => {
    try {
        await seedGetways();
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Database seeding error", error);
        throw error;
    }
};
