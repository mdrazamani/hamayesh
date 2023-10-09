import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String, // اضافه کردن نوع داده
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String, // اضافه کردن نوع داده
            required: true,
        },
        email: {
            type: String, // اضافه کردن نوع داده
            required: true,
            unique: true,
            lowercase: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
