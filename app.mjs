import express from "express";
import routes from "./routes/index.mjs";
import errorHandler from "./app/middlewares/error.middleware.mjs";

const app = express();

app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
