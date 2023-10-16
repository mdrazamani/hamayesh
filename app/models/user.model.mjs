import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Role from "./role.model.mjs";
import Token from "./token.model.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";
import APIError from "../../utils/errors.mjs";
import constants from "../../utils/constants.mjs";

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
        // In your User schema definition
        deletedAt: {
            type: Date, // or you can use 'default: null' if you want it to be explicitly set for active users
            default: null,
        },
    },
    { timestamps: true }
);

// Query middleware to exclude soft-deleted users
userSchema.pre(/^find/, function (next) {
    // 'this' is an instance of mongoose.Query
    // this.find({ deletedAt: { $eq: null } }).select("-password");
    this.find({ deletedAt: { $eq: null } });
    next();
});

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
            throw new APIError({
                message: getMessage("errors.Invalid_role_name_provided"),
                status: constants.BAD_REQUEST,
            });
        }
    }
    next();
});

userSchema.post("save", async function (doc, next) {
    try {
        // Check if 'deletedAt' was set, indicating a soft delete operation
        if (doc.deletedAt) {
            // Delete the associated tokens
            await Token.deleteMany({ userId: doc._id });
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        await Token.deleteMany({ userId: this._id });
    }
    next();
});

const User = mongoose.model("User", userSchema);

export async function getUsersWithStructure(page = 1, pageSize = 10) {
    try {
        const skip = (page - 1) * pageSize;
        // Define the aggregation pipeline
        const pipeline = [
            {
                $match: { deletedAt: { $eq: null } }, // filtering out soft-deleted records
            },
            {
                $lookup: {
                    from: "roles", // assuming your roles collection is named "roles"
                    localField: "role.id", // the field from your "users" collection
                    foreignField: "_id", // the field from your "roles" collection (usually the primary key)
                    as: "roleDetails", // the array where the joined data will be placed
                },
            },
            {
                $unwind: "$roleDetails", // removes the array shell, can cause issues if there are users without roles
            },
            {
                $project: {
                    // shaping the document structure
                    _id: 0, // excluding the field "_id"
                    firstName: 1, // including the field "firstName"
                    lastName: 1, // including the field "lastName"
                    phoneNumber: 1, // including the field "phoneNumber"
                    email: 1, // including the field "email"
                    role: "$roleDetails.name", // getting the role name from the looked-up document
                    emailVerifiedAt: 1, // including the field "emailVerifiedAt"
                    lastLoginAt: 1, // including the field "lastLoginAt"
                    // if you have more fields, include them here
                },
            },
        ];

        // Execute the aggregation pipeline
        const items = await User.aggregate(pipeline).skip(skip).limit(pageSize);
        const total = await User.countDocuments({ deletedAt: { $eq: null } });
        return {
            items,
            total,
            pages: Math.ceil(total / pageSize),
            currentPage: page,
        };
    } catch (err) {
        // Handle the error properly
        console.error(err);
        throw err; // re-throwing or handling it as per your application's error handling logic
    }
}

export default User;
