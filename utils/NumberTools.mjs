export const validateNumber = (value) => {
    return isNaN(value) || value === null ? 0 : value;
};
