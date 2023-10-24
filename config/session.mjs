import session from "express-session";
import { secret } from "./index.mjs";

const sessionConfig = {
    secret: secret, // Replace with your own secret
    resave: false,
    saveUninitialized: true, // GDPR laws against setting cookies automatically
    cookie: {
        secure: false, // Ensure you set this to true for production for secure cookies (requires HTTPS)
        maxAge: 3600000, // Configure cookie max age as per your requirements
    },
};

const sessionMiddleware = session(sessionConfig);

export default sessionMiddleware;
