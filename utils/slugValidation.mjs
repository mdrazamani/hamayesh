export const validateAndTransformSlug = (value, helpers) => {
    const hyphenatedSlug = value
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\u0600-\u06FFa-zA-Z0-9_-]/g, "");

    if (!hyphenatedSlug.length) {
        return helpers.error("any.invalid");
    }

    return hyphenatedSlug;
};
