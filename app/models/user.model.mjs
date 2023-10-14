import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Role from "./role.model.mjs";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phoneNumber: { type: String, unique: true, required: true },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        emailVerifiedAt: {
            type: Date,
            default: null,
        },
        role: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role",
            },
            name: {
                type: String,
                required: true,
            },
        },
        profileImage: {
            type: String, // You can store the path to the profile image in this field
        },
        lastLoginAt: {
            type: Date,
        },
    },
    { timestamps: true }
);
// user data resource
userSchema.methods.toResource = function (api_token = null) {
    // another method
    // const userObject = this.toObject();
    // delete userObject.password;
    // return userObject;

    return {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        role: this.role.name,
        emailVerifiedAt: this.emailVerifiedAt,
        lastLoginAt: this.lastLoginAt,
        api_token,
        // Other fields...
    };
};

// Ensure the provided role name exists in the Role collection
userSchema.pre("validate", async function (next) {
    if (this.isModified("role")) {
        const role = await Role.findOne({ name: this.role.name });
        if (!role) {
            throw new Error("Invalid role name provided");
        }
    }
    next();
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model("User", userSchema);
export default User;
