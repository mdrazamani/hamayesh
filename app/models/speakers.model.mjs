import mongoose from "mongoose";

const speakerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true, // Ensures spaces are not counted towards the character count
        },
        description: {
            type: String,
            required: true,
            trim: true, // Remove whitespace from both ends of a string
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
            unique: true, // Each speaker document should be uniquely associated with a user
        },
        // More fields depending on the specifics of your application
    },
    { timestamps: true } // Enables automatic createdAt and updatedAt timestamps
);

speakerSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;
    },
});
// If you need any indexing for efficient querying, add here
// speakerSchema.index({ /* fields to index */ });

// If you require any pre-save checks or operations, add them here
speakerSchema.pre("save", async function (next) {
    // Any necessary pre-save logic

    next(); // Proceed with saving if everything is in order
});

const Speaker = mongoose.model("Speaker", speakerSchema);

export default Speaker;
