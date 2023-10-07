import User from "../models/user.model.mjs";
import crudFactory from "../../utils/crudFactory.mjs";

export const getAllUsers = crudFactory.getAll(User);
export const createUser = crudFactory.create(User);
