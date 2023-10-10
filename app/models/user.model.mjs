import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Role from "./role.model.mjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
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
  },
  { timestamps: true }
);

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
