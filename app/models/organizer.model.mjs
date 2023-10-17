import mongoose from "mongoose";

const OrganizerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        link: {
            type: String,
        },
        isMain: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

OrganizerSchema.set("toJSON", {
    // virtuals: true,
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
    },
});

const Organizer = mongoose.model("Organizer", OrganizerSchema);

export default Organizer;
