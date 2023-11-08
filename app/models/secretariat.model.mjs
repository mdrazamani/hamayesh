import mongoose from "mongoose";

const secretariatType = ["academic", "executive", "policy", "conferance"];
const secretariatSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        boss: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // or another relevant model
            required: true,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // assuming 'User' is the model name for your userSchema
            },
        ],
        type: {
            type: String,
            enum: secretariatType, // replace with your actual types
            required: true,
            unique: true, // This ensures no two documents can have the same type
        },
    },
    { timestamps: true }
);

secretariatSchema.index({ title: "text" }); // example compound index

secretariatSchema.set("toJSON", {
    virtuals: true, // ensures virtual fields are included
    transform: (doc, converted) => {
        delete converted.__v;
        delete converted._id;
        converted.id = doc._id;
    },
});

secretariatSchema.virtual("faType").get(function () {
    if (this.type) {
        // Replace this logic with how you map role names to their corresponding faNames
        // For example, you can use a dictionary or a switch statement.
        const roleNamesToFaNams = {
            executive: "دبیرخانه اجرایی",
            academic: "دبیرخانه علمی",
            policy: "دبیرخانه سیاستگذاری",
            conferance: "دبیرخانه کنفرانس",
        };

        return roleNamesToFaNams[this.type] || "دبیرخانه";
    }
    return "دبیرخانه"; // Or handle this case as you prefer
});
// Pre-save hook to execute before saving a new document
secretariatSchema.pre("save", async function (next) {
    const secretariat = this;

    // If 'users' field is provided, ensure it contains unique IDs only
    if (secretariat.isModified("users")) {
        secretariat.users = [...new Set(secretariat.users.map(String))];
    }

    next(); // If all checks pass, proceed with saving the new document
});

const Secretariat = mongoose.model("Secretariat", secretariatSchema);

export default Secretariat;
