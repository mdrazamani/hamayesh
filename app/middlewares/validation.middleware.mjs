export default (validationSchema) => (req, res, next) => {
    const { error } = validationSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};
