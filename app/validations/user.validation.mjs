import Joi from "joi";

const userValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

export default userValidation;
