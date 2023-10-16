import mongoose from "mongoose";

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

// token data resource
tokenSchema.methods.toResource = function () {
    return {
        token: this.token,
        expiresAt: this.expiresAt,
    };
};

tokenSchema.pre("save", async function (next) {
    try {
        const userId = this.userId;
        const existingTokensCount = await this.model("Token").countDocuments({
            userId: userId,
        });

        if (existingTokensCount >= 3) {
            // Create a custom error and pass it to the next function
            const error = new Error(
                "You cannot have more than 3 active tokens"
            );
            error.status = 403;
            next(error); // Passing error to the next middleware
        } else {
            next(); // No error, proceed to save
        }
    } catch (error) {
        next(error); // If there's an error during the execution, pass it to the next middleware
    }
});

export default mongoose.model("Token", tokenSchema);
