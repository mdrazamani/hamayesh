import Question from "../../app/models/question.model.mjs";

export const seedQuestions = async () => {
    const questions = [
        {
            title: "test",
            description: "test test",
            items: [
                {
                    question: "How I Can Do It?",
                    response: "You Can Man Go Home.",
                },
            ],
        },
    ];

    try {
        await Question.insertMany(questions);
        console.log("Question seeded successfully!");
    } catch (error) {
        console.error("Error seeding Question:", error);
    }
};
