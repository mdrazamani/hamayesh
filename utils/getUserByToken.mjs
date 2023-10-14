import User from "../app/models/user.model.mjs";
import Token from "../app/models/token.model.mjs";

export const getUserByToken = async (token) => {
    try {
        const tokenDoc = Token.findOne({ token: token });
        const user = User.findOne({ id: tokenDoc.userId });

        return user;
    } catch (error) {
        throw new Error("Token is not valid");
    }
};
