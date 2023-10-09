import jwt from "jsonwebtoken";
import Token from "../app/models/token.model.mjs";
import { checkToken } from "./checkToken.mjs";

const checkToken = async (user) => {
    await Token.deleteMany({
        userId: user._id,
        expiresAt: { $lt: new Date() },
    });

    if ((await Token.countDocuments({ userId: user._id })) >= 3) {
        return res.status(400).json({
            message: "You cannot have more than 3 active tokens.",
        }); //this is a errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
    }
};

export const generateTokens = async (user) => {
    //check token
    checkToken(user);

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
        expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
        { id: user._id, role: user.role },
        SECRET_KEY,
        { expiresIn: "7d" }
    );
    await new Token({
        token,
        refreshToken,
        userId: user._id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }).save();
    return { token, refreshToken };
};
