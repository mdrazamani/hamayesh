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

// // Query middleware to exclude soft-deleted users
// NewsCommentSchema.pre(/^find/, function (next) {
//     this.find({ status: { $eq: true } });

//     next();
// });

NewsCommentSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
        converted.id = doc._id;
    },
});

const NewsComment = mongoose.model("NewsComment", NewsCommentSchema);

export default NewsComment;
