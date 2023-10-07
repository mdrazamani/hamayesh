import mongoose from "mongoose";
import { dbURI } from "./index.mjs";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
