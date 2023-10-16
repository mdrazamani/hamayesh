import jwt from "jsonwebtoken";
import Token from "../app/models/token.model.mjs";
import { secret } from "../config/index.mjs";

export const generateTokens = async (user) => {
    const token = jwt.sign({ id: user._id, role: user.role.name }, secret, {
        expiresIn: "4h",
    });

    const refreshToken = jwt.sign(
        { id: user._id, role: user.role.name },
        secret,
        {
            expiresIn: "7d",
        }
    );

    new Token({
        token,
        refreshToken,
        userId: user._id,
        expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000), //+ 7 * 24 * 60 * 60 * 1000
    }).save();

    return { token, refreshToken };
};
