import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        items: [
            {
                question: {
                    type: String,
                    required: true,
                },
                response: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

QuestionSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted.__v;
        delete converted._id;
        converted.id = doc._id;

        // Remove _id from each item in the items array
        if (converted.items && Array.isArray(converted.items)) {
            converted.items.forEach((item) => {
                delete item._id;
            });
        }
    },
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
