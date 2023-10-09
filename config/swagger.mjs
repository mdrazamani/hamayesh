import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Your API",
            version: "1.0.0",
            description: "Your API Description",
        },
        servers: [
            {
                url: "http://127.0.0.1:8000",
            },
        ],
    },
    apis: ["../routes/*.routes.mjs"], // path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
