import mongoose from "mongoose";

const NewsCommentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        likeNumber: {
            type: Number,
            default: 0,
        },
        userFirstName: {
            type: String,
        },
        userLastName: {
            type: String,
        },
        userEmail: {
            type: String,
        },
        userIp: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },

    { timestamps: true }
);

NewsCommentSchema.index({
    comment: "text",
});

NewsCommentSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
    },
});

const NewsComment = mongoose.model("NewsComment", NewsCommentSchema);

export default NewsComment;
