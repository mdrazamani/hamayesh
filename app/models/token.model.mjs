import mongoose from "mongoose";
import { ForbiddenError } from "../middlewares/error.middleware.mjs";

const tokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            index: true, // Index for faster queries
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true, // Index for faster queries
        },
        expiresAt: {
            type: Date,
            required: true,
            expires: 0, // This will remove the document when the current date and time is >= expiresAt
        },
    },
    {
        timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
    }
);

tokenSchema.pre("save", async function (next, { req, res }) {
  const userId = this.userId; // 'this' refers to the token instance

  if ((await this.model("Token").countDocuments({ userId: userId })) >= 3) {
    // Throw the ForbiddenError if the user has 3 or more active tokens
    return ForbiddenError(
      req,
      res,
      next,
      "You cannot have more than 3 active tokens"
    );
  }

  next(); // Move on to the next middleware or save the document
});

export default mongoose.model("Token", tokenSchema);
