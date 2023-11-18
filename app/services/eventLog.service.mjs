import crudFactory from "../../utils/crudFactory.mjs";
import EventLog from "../models/eventLog.model.mjs";

export const getAll = async (options) => {
    return await crudFactory.getAll(EventLog)(options);
};
