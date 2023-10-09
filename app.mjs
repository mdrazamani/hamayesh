import express from "express";
import routes from "./routes/index.mjs";
import dbconnect from "./config/db.mjs";
import { PORT } from "./config/index.mjs";
import errorHandler from "./app/middlewares/error.middleware.mjs";
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
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
dbconnect();

app.enable("trust proxy");

app.set("view engine", "pug");

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(`file://${path.join(__dirname, "../app/models")}`));

// GLOBAL MIDDLEWARES
app.use(cors());

app.options("*", cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
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

app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandler);

const port = PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//export default app;
