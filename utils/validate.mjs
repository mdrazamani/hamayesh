import { validate } from "express-validation";

export function dynamicValidate(schemaFunc) {
    return (req, res, next) => {
        const schema = schemaFunc(req);
        return validate(schema)(req, res, next);
    };
}

export function exportBearerToken(req) {
    const authHeader = req.headers.authorization;

    const authHeaderParts = authHeader.split(" ");

    return authHeaderParts[1];
}
