export const userResource = (data, api_token = null) => {
    return {
        username: data.username,
        email: data.email,
        role: data.role,
        api_token,
    };
};
