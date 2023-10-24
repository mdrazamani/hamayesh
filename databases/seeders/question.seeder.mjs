import Question from "../../app/models/question.model.mjs";

export const seedQuestions = async () => {
    const questions = [
        {
            title: "How to use JavaScript for web development?",
            description:
                "I am new to web development and want to learn JavaScript. Can anyone provide guidance on how to get started with JavaScript for web development?",
            items: [
                {
                    question: "What are the basic concepts of JavaScript?",
                    response:
                        "JavaScript is a high-level, interpreted programming language used for web development. Some basic concepts include variables, data types, functions, and control structures like loops and conditionals.",
                },
                {
                    question: "Where can I find resources to learn JavaScript?",
                    response:
                        "There are many online resources available to learn JavaScript, including tutorials, documentation, and interactive coding platforms like Codecademy and MDN Web Docs.",
                },
                {
                    question:
                        "What are some best practices for JavaScript development?",
                    response:
                        "Best practices include using meaningful variable names, writing clean and readable code, and following coding conventions. It's also important to understand concepts like scope and closures.",
                },
                {
                    question: "How can I debug JavaScript code?",
                    response:
                        "You can use browser developer tools to debug JavaScript code. Console.log() is a common method for debugging, and there are also more advanced debugging techniques available.",
                },
            ],
        },
        {
            title: "Web Security Best Practices",
            description:
                "Security is a critical aspect of web development. What are some best practices for ensuring the security of web applications?",
            items: [
                {
                    question: "What is Cross-Site Scripting (XSS)?",
                    response:
                        "Cross-Site Scripting (XSS) is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users. It can be prevented by sanitizing and escaping user inputs.",
                },
                {
                    question: "How can I protect against SQL injection?",
                    response:
                        "To protect against SQL injection, use prepared statements and parameterized queries when interacting with databases. Never concatenate user inputs directly into SQL queries.",
                },
                {
                    question: "What is HTTPS and why is it important?",
                    response:
                        "HTTPS (Hypertext Transfer Protocol Secure) is a secure version of HTTP. It encrypts the data exchanged between a user's browser and a website, ensuring confidentiality and integrity of data.",
                },
                {
                    question:
                        "Do I need to sanitize user inputs for NoSQL databases?",
                    response:
                        "Yes, even for NoSQL databases, it's essential to sanitize user inputs to prevent injection attacks. NoSQL databases are not immune to security vulnerabilities.",
                },
            ],
        },
        // Add more questions and responses as needed...
    ];

    try {
        await Question.deleteMany({});
        await Question.insertMany(questions);
        console.log("Questions seeded successfully!");
    } catch (error) {
        console.error("Error seeding Questions:", error);
    }
};
