import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Role from "./role.model.mjs";
import Token from "./token.model.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";
import APIError from "../../utils/errors.mjs";
import constants from "../../utils/constants.mjs";
import jwt from "jsonwebtoken";
import { secret } from "../../config/index.mjs";

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
        phoneNumber: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
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

userSchema.index({ firstName: "text" }); // Add this if these are the fields you want to search within.

// Query middleware to exclude soft-deleted users
userSchema.pre(/^find/, function (next) {
    this.find({ deletedAt: { $eq: null } });
    next();
});

userSchema.set("toJSON", {
    virtuals: true, // ensures virtual fields are included
    transform: (doc, converted) => {
        delete converted.password; // removes this field from the response
        delete converted._id; // if you also want to remove the _id field
        delete converted.__v; // if you want to remove the version key
        delete converted.deletedAt;
        // conditionally add the api_token to the output if it exists
        if (doc._api_token) {
            converted.api_token = doc._api_token;
        }

        if (converted.role && converted.role.name) {
            // Replace 'role' object with just the role name
            converted.role = converted.role.name;
        }
    },
});

// Add this within your userSchema definition

userSchema
    .virtual("api_token")
    .get(function () {
        // This value should be set using a method in the model. It does not persist in the database.
        return this._api_token;
    })
    .set(function (value) {
        // Temporary hold the value in the model instance
        this._api_token = value;
    });

// Method to generate or set the token
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ id: this._id, role: this.role.name }, secret, {
        expiresIn: "4h",
    });
    // Here you can call the logic to generate a token
    // You could use JWT or any other token generation logic you need

    try {
        await new Token({
            token,
            userId: this._id,
            expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000), //+ 7 * 24 * 60 * 60 * 1000
        }).save();
        this.api_token = token; // setting the virtual field

        return token;
    } catch (error) {
        throw new APIError(
            getMessage("errors.something_went_wrong"),
            constants.INTERNAL_SERVER_ERROR
        ); // Or handle it in a way that's appropriate for your application logic
    }
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

export default User;
