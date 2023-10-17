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
        delete converted._id;
        delete converted.__v;
    },
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
