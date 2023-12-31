import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const Debug_mode = process.env.Debug_mode;
export const dbURI = process.env.DB_URI;
export const secret = process.env.SECRET;
export const gmailUser = process.env.GMAIL_USER;
export const gmailPass = process.env.GMAIL_PASS;
export const Language = process.env.LANGUAGE_MAIN;
export const redirectUrlEnv = process.env.REDIRECT_URL;
