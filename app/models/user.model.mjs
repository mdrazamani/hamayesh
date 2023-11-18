import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Role from "./role.model.mjs";
import Token from "./token.model.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";
import APIError from "../../utils/errors.mjs";
import constants from "../../utils/constants.mjs";
import jwt from "jsonwebtoken";
import { secret } from "../../config/index.mjs";
import path from "path";
import fs from "fs";

import { loadLanguageSetting } from "../../config/readLang.mjs";
import {
    addVirtualFields,
    toJSON,
    processLanguageFieldsInUpdate,
} from "../../config/modelChanger.mjs";

const lang = await loadLanguageSetting();

const userSchema = new mongoose.Schema(
    {
        fa: {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            degree: {
                type: String,
            },
            institute: {
                type: String,
            },
            bio: {
                type: String,
            },
            job: {
                type: String,
            },
            study_field: {
                type: String,
            },
        },
        en: {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            degree: {
                type: String,
            },
            institute: {
                type: String,
            },
            bio: {
                type: String,
            },
            job: {
                type: String,
            },
            study_field: {
                type: String,
            },
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
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
        national_id: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female"],
        },
        state: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "State",
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "City",
        },
        socials: {
            facebook: {
                type: String,
                default: null, // assuming the link may not be provided
            },
            twitter: {
                type: String,
                default: null, // assuming the link may not be provided
            },
            linkedIn: {
                type: String,
                default: null, // assuming the link may not be provided
            },
            whatsapp: {
                type: String,
                default: null, // assuming the link may not be provided
            },
            telegram: {
                type: String,
                default: null, // assuming the link may not be provided
            },
            // add other platforms as needed
        },
    },
    { timestamps: true }
);

addVirtualFields(userSchema, lang, userSchema.obj.fa);

userSchema.index({
    "fa.firstName": "text",
    "en.firstName": "text",
    "fa.lastName": "text",
    "en.lastName": "text",
    email: "text",
    phoneNumber: "text",
}); // Add this if these are the fields you want to search within.

// Query middleware to exclude soft-deleted users
userSchema.pre(/^find/, function (next) {
    this.find({ deletedAt: { $eq: null } });
    this.populate("state", "state") // replace 'name' with the actual fields you want from the State document
        .populate("city", "city"); // replace 'name' with the actual fields you want from the City document
    next();
});

userSchema.virtual("faRole").get(function () {
    if (this.role && this.role.name) {
        // Replace this logic with how you map role names to their corresponding faNames
        // For example, you can use a dictionary or a switch statement.
        const roleNamesToFaNams = {
            user: "کاربر",
            admin: "ادمین",
            referee: "داور",
            executive: "کاربر اجرایی",
            scientific: "کاربر علمی",
            // Add more role mappings as needed
        };

        return roleNamesToFaNams[this.role.name] || "کاربر";
    }
    return "کاربر"; // Or handle this case as you prefer
});

userSchema.set("toJSON", {
    virtuals: true, // ensures virtual fields are included
    transform: (doc, converted) => {
        delete converted.password; // removes this field from the response
        delete converted._id; // if you also want to remove the _id field
        delete converted.__v; // if you want to remove the version key
        delete converted.deletedAt;
        // conditionally add the api_token to the output if it exists

        //multiLanguage
        toJSON(doc, converted, lang, userSchema.obj.fa);

        if (doc._api_token) {
            converted.api_token = doc._api_token;
        }

        if (converted.role && converted.role.name) {
            // Replace 'role' object with just the role name
            converted.role = converted.role.name;
        }

        // Check if 'state' is an object and has a 'name' property
        if (converted.state && converted.state.state) {
            // Replace the 'state' object with just the 'state' value
            converted.state = converted.state.state;
        }

        // Check if 'city' is an object and has a 'name' property
        if (converted.city && converted.city.city) {
            // Replace the 'city' object with just the 'city' value
            converted.city = converted.city.city;
        }
    },
});

userSchema.pre("findOneAndUpdate", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, userSchema.obj.fa);
    next();
});

userSchema.pre("updateOne", function (next) {
    let update = this.getUpdate();
    processLanguageFieldsInUpdate(update, lang, userSchema.obj.fa);
    next();
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
userSchema.methods.generateAuthToken = async function (next) {
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
        next(error);
    }
};

userSchema.pre("save", async function (next) {
    if (!this.role || !this.role.id) {
        try {
            // This is a schema-level middleware; 'this' refers to the document being saved.
            const defaultRole = await Role.findOne({ name: "user" });

            if (!defaultRole) {
                throw new APIError(
                    getMessage("errors.invalidRole"),
                    constants.BAD_REQUEST
                );
            }

            // Set the default role id and name
            this.role = {
                id: defaultRole._id,
                name: defaultRole.name,
            };
        } catch (error) {
            return next(error); // If there's an error, pass it to the next middleware
        }
    }
    next(); // If there's no error, proceed to the next middleware or save operation
});

// This middleware will intercept findOneAndUpdate operations.
userSchema.pre("findOneAndUpdate", async function (next) {
    // 'this' now refers to the query, not the document being updated.
    const update = this.getUpdate();

    // Check if the role name is being updated
    if (update?.role && typeof update?.role === "string") {
        // Role name provided, fetch the corresponding role document
        try {
            const roleDoc = await Role.findOne({ name: update.role });

            if (!roleDoc) {
                // If the role with the provided name doesn't exist, return an error.
                throw new Error("Invalid role name provided");
            }

            // If the role exists, update the role field with the correct structure
            update.role = {
                id: roleDoc._id, // the actual role ID from the role document
                name: roleDoc.name, // the role name (same as provided)
            };

            // Proceed with the update operation
            next();
        } catch (error) {
            // If an error occurs (e.g., the role doesn't exist), pass the error to the next middleware
            next(error);
        }
    } else {
        // If the role is not being updated, proceed with the update operation
        next();
    }
});

userSchema.pre("findOneAndUpdate", async function (next) {
    try {
        // 'this' refers to the query being executed.
        const query = this;
        const update = query.getUpdate();

        if (update?.$set && update.password) {
            this.update(
                {},
                { password: await bcrypt.hash(update.password, 10) }
            );
        }

        // Check if the email is being updated
        if (update?.$set && update.email) {
            // The user has changed their email, so we need to mark it as unverified
            this.update({}, { emailVerifiedAt: null });
        }

        // Check if the profile image is being updated
        if (update?.profileImage) {
            const currentDocument = await query.findOne(this.getQuery());

            if (currentDocument && currentDocument.profileImage) {
                const imagePath = path.join(
                    process.cwd(),
                    currentDocument.profileImage
                );

                try {
                    await fs.promises.unlink(imagePath);
                } catch (error) {
                    // Check for the specific error ENOENT (No such file or directory)
                    if (error.code !== "ENOENT") {
                        throw error; // If it's any other error, rethrow it
                    }
                    // If it's ENOENT, just log it and continue, as the file is already not present
                    console.log(
                        "File already deleted or not found: ",
                        imagePath
                    );
                }
            }
        }
        next();
    } catch (error) {
        // Log the error. You might want to handle this differently or even pass the error to 'next'
        console.error("Error removing associated file: ", error);
        next(error); // This will prevent the document from being removed in the case of an error
    }
});

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
        // 'this' refers to the document being processed
        if (this.isModified("email")) {
            // The user has changed their email, so we need to mark it as unverified
            this.emailVerifiedAt = null;
        }
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
