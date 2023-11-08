import mongoose from "mongoose";

const SupporterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        supportType: {
            type: String,
            enum: ["Financial", "Academic"],
            required: true,
        },
        link: {
            type: String,
        },
    },
    { timestamps: true }
);

SupporterSchema.set("toJSON", {
    virtuals: true, // ensures virtual fields are included
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;
    },
});

SupporterSchema.virtual("faType").get(function () {
    if (this.supportType) {
        // Replace this logic with how you map role names to their corresponding faNames
        // For example, you can use a dictionary or a switch statement.
        const roleNamesToFaNams = {
            Financial: "حامی مالی",
            Academic: "حامی علمی",
        };

        return roleNamesToFaNams[this.supportType] || "حامی علمی";
    }
    return "حامی علمی"; // Or handle this case as you prefer
});

const Supporter = mongoose.model("Supporter", SupporterSchema);

export default Supporter;
