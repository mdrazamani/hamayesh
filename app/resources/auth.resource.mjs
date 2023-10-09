import { userResource } from "./user.resource.mjs";

export const authResource = (data) => {
    return {
        data: userResource(data.user, data.api_token),
        status: data.status,
    };
};
