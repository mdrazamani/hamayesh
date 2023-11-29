// services/authService.mjs

import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";
import APIError from "../../utils/errors.mjs";
import HamayeshDetail from "../models/hamayeshDetail.model.mjs";
import User from "../models/user.model.mjs";
import { create as createInvoice } from "./billing/invoice.service.mjs";

export const registerUser = async (data, req, res) => {
    // Check the registration deadline before creating a new user
    const eventDetail = await HamayeshDetail.findOne(); // Adjust query if necessary

    if (!eventDetail) {
        throw new APIError(
            getMessage("Event details not found."),
            constants.UNPROCESSABLE_ENTITY
        );
    }

    const lastRegistrationDate = eventDetail.dates.lastRegistration;

    if (lastRegistrationDate && new Date() > lastRegistrationDate) {
        throw new APIError(
            getMessage("Registration has been closed."),
            constants.UNPROCESSABLE_ENTITY
        );
    }

    // ------------- invoice -------------
    if (data?.items) {
        const items = data?.items;
        delete data?.items;
    }
    const user = new User(data);
    await user.save();
    await user.generateAuthToken();
    if (items) {
        await createInvoice({ user: user?._id, items });
    }
    return user;
};
