import mongoose from "mongoose";
const roleTypes = [
    "admin",
    "user",
    "executive",
    "scientific",
    "referee",
    "scientific-editor",
];
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        enum: roleTypes,
    },
    description: {
        type: String,
    },

    faName: {
        type: String,
        required: true,
    },
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
