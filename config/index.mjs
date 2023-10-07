import dotenv from "dotenv";
dotenv.config();

export const dbURI = process.env.DB_URI;
export const secret = process.env.SECRET;
export const gmailUser = process.env.GMAIL_USER;
export const gmailPass = process.env.GMAIL_PASS;
