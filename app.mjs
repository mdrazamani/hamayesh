import express from "express";
import routes from "./routes/index.mjs";
import dbconnect from "./config/db.mjs";
import { PORT } from "./config/index.mjs";
import errorHandler from "./app/middlewares/error.middleware.mjs";

const app = express();
dbconnect();

app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandler);

const port = PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
