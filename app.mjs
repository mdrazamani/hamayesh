import express from "express";
import routes from "./routes/index.mjs";
import dbconnect from "./config/db.mjs";
import { Debug_mode, PORT } from "./config/index.mjs";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swagger.mjs";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "./config/hpp.mjs";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { createFilePath } from "./config/tools.mjs";
import {
    ConvertError,
    ErrorHandler,
    unifiedResponseHandler,
} from "./app/middlewares/response.middleware.mjs";
import i18n, { setLocaleMiddleware } from "./config/i18nConfig.mjs";
import fileUpload from "./config/fileUpload.mjs";
import { logEvent } from "./app/middlewares/eventLog.middleware.mjs";
import { resetAndSaveDailyVisits } from "./jobs/dailyVisit.task.mjs";
import bodyParser from "body-parser";
import { state } from "./utils/visits.mjs";
import { languageMiddleware } from "./app/middlewares/languageMiddleware.mjs";

const { json, urlencoded } = bodyParser;
//run jobs:
// import "./jobs/token.task.mjs"; // Import the token manager

const app = express();

app.use(cookieParser());
app.use("/api/v1", languageMiddleware);

// max-input-string: 5mb
app.use(json({ limit: "5mb" }));
// app.use(urlencoded({ limit: "5mb", extended: true }));

dbconnect();

resetAndSaveDailyVisits(state);
app.use((req, res, next) => {
    state.dailyVisits += 1;
    next();
});

// language

app.use("/public", express.static("public"));

app.use(fileUpload);

app.use(i18n.init);
app.use(setLocaleMiddleware);

app.enable("trust proxy");

app.set("view engine", "pug");

app.set("views", createFilePath("./views"));

// GLOBAL MIDDLEWARES
app.use(cors());

app.options("*", cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (Debug_mode === "development") {
    app.use(morgan("dev"));
}

// Rate limiter for GET requests
const getLimiter = rateLimit({
    trustProxy: false,
    max: 1000,
    windowMs: 60 * 1 * 1000,
    message:
        "Too many GET requests from this IP, please try again in a minute!",
});

// Rate limiter for non-GET requests
const nonGetLimiter = rateLimit({
    trustProxy: false,
    max: 100,
    windowMs: 60 * 1 * 1000,
    message: "Too many requests from this IP, please try again in a minute!",
});

// Middleware to apply the appropriate rate limiter
const customLimiter = (req, res, next) => {
    if (req.method === "GET") {
        getLimiter(req, res, next);
    } else {
        nonGetLimiter(req, res, next);
    }
};

// Use the customLimiter middleware in your Express app
// app.use("/api", customLimiter);

// Sending Response best practice for debugging
// app.use((req, res, next) => {
//     const oldSend = res.send;
//     const oldJson = res.json;

//     res.send = function (data) {
//         console.log("Sending Response:", data);
//         return oldSend.apply(res, arguments);
//     };

//     res.json = function (data) {
//         console.log("Sending Response:", data);
//         return oldJson.apply(res, arguments);
//     };

//     next();
// });

// Body parser, reading data from body into req.body
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(compression());

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// New route to serve Swagger JSON
app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", "attachment; filename=swagger.json");
    res.send(swaggerDocs);
});

app.use(unifiedResponseHandler);
app.use("/api/v1", logEvent, routes);
app.use(ConvertError); // Make sure to use ConvertError before ErrorHandler in middleware stack
app.use(ErrorHandler);

const port = PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//export default app;
