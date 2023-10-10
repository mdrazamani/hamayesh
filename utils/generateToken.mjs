import jwt from "jsonwebtoken";
import { secret } from "../config/index.mjs";
const checkToken = async (user, Token) => {
    await Token.deleteMany({
        userId: user._id,
        expiresAt: { $lt: new Date() },
    });
};

export const generateTokens = async (user, Token) => {
    //check token
    await checkToken(user, Token);

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
    await new Token({
        token,
        refreshToken,
        userId: user._id,
        expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000), //+ 7 * 24 * 60 * 60 * 1000
    }).save();
    return { token, refreshToken };
};
