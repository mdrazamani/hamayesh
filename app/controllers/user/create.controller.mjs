import * as userService from "../../services/user.service.mjs";

export const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};
