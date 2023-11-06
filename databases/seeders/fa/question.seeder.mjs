import Question from "../../../app/models/question.model.mjs";

export const seedQuestionsFA = async () => {
    const questions = [
        {
            title: "چگونه می‌توانم برای همایش نفت و گاز ثبت‌نام کنم؟",
            description: "اطلاعات لازم برای ثبت‌نام در همایش.",
            items: [
                {
                    question: "روند ثبت‌نام برای همایش چگونه است؟",
                    response:
                        "برای ثبت‌نام در همایش، لازم است به وب‌سایت همایش مراجعه کنید و فرم ثبت‌نام آنلاین را پر کنید. ممکن است نیاز به ارسال مدارکی مانند رزومه یا کارت شناسایی داشته باشید.",
                },
                {
                    question: "هزینه ثبت‌نام برای همایش چقدر است؟",
                    response:
                        "هزینه ثبت‌نام بسته به نوع بلیت و مقام شما در همایش می‌تواند متفاوت باشد. تخفیف‌هایی نیز برای دانشجویان، اعضای انجمن‌های حرفه‌ای و زودهنگام‌ثبت‌نام‌کنندگان در نظر گرفته شده است.",
                },
            ],
        },
        {
            title: "امکانات و خدمات موجود در طول همایش چیست؟",
            description:
                "اطلاعاتی در مورد امکانات و خدمات موجود برای شرکت‌کنندگان.",
            items: [
                {
                    question: "چه نوع امکاناتی برای شرکت‌کنندگان فراهم است؟",
                    response:
                        "همایش شامل امکاناتی مانند فضای نمایشگاهی، اتاق‌های کنفرانس با تجهیزات پیشرفته، مراکز پذیرایی و رستوران‌ها، و اتاق‌های مخصوص استراحت و شبکه‌سازی می‌باشد.",
                },
                {
                    question: "آیا در طول همایش خدمات ترجمه فراهم می‌باشد؟",
                    response:
                        "بله، خدمات ترجمه زبان برای شرکت‌کنندگانی که به زبان انگلیسی صحبت نمی‌کنند در دسترس خواهد بود.",
                },
            ],
        },
        {
            title: "چه برنامه‌ریزی‌هایی برای رویدادهای اجتماعی همایش وجود دارد؟",
            description:
                "جزئیات برنامه‌ریزی شده برای رویدادهای اجتماعی در طول همایش.",
            items: [
                {
                    question:
                        "آیا رویدادهای اجتماعی خاصی در طول همایش برگزار می‌شود؟",
                    response:
                        "همایش شامل رویدادهای اجتماعی مختلفی مانند میهمانی‌های شبانه، گردهمایی‌های حرفه‌ای و تورهای گردشگری برای آشنایی با فرهنگ و جاذبه‌های محلی می‌باشد.",
                },
                {
                    question:
                        "چگونه می‌توانم در رویدادهای اجتماعی همایش شرکت کنم؟",
                    response:
                        "برای شرکت در رویدادهای اجتماعی، می‌توانید هنگام ثبت‌نام در همایش، انتخاب‌های مربوطه را علامت‌زدن کنید یا از طریق پنل کاربری خود در وب‌سایت همایش ثبت‌نام نمایید.",
                },
            ],
        },
    ];

    try {
        await Question.deleteMany({});
        await Question.insertMany(questions);
        console.log("سوالات متداول همایش با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن سوالات متداول همایش:", error);
    }
};
