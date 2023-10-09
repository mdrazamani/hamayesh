import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            required: true,
        },
        email: {
            required: true,
            unique: true,
            lowercase: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
