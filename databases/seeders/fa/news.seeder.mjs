import News from "../../../app/models/news.model.mjs";
import User from "../../../app/models/user.model.mjs";
import { seedNewsCommentsFA } from "./newsComment.seeder.mjs"; // import the function from step 1
import { seedNewsTagsFA } from "./newsTag.seeder.mjs";
import { seedNewsCategoriesFA } from "./newsCategory.seeder.mjs";

export const seedNewsFA = async () => {
    let createdCategories = await seedNewsCategoriesFA();
    let createdComments = await seedNewsCommentsFA();
    let commentIds = createdComments.map((comment) => comment._id);
    let createdTags = await seedNewsTagsFA();
    let tagIds = createdTags.map((tag) => tag._id);

    const user = await User.findOne();

    // Create news data, incorporating the comment IDs
    const newsData = [
        // ...existing news items...
        {
            title: "هوش مصنوعی در سال 2023: جهش‌ها و دستاوردها",
            description: `
                <h2>نگاهی به پیشرفت‌های چشمگیر هوش مصنوعی در سال 2023</h2>
                <p>در این مقاله، <strong>آخرین پیشرفت‌های</strong> هوش مصنوعی را بررسی می‌کنیم، از یادگیری عمیق تا پردازش زبان طبیعی.</p>
                <img src="http://127.0.0.1:8000\\public\\uploads\\news\\news2.jpg" alt="هوش مصنوعی" style="width: 100%">
                <p>هوش مصنوعی (AI) در حال تغییر چهره صنایع مختلف است، از بهداشت و درمان گرفته تا خودروسازی و مالی. <a href='#'>بیشتر بخوانید...</a></p>
                <ul>
                    <li>پیشرفت‌ها در الگوریتم‌های یادگیری ماشین</li>
                    <li>نوآوری‌ها در روباتیک</li>
                    <li>کاربرد هوش مصنوعی در تشخیص بیماری‌ها</li>
                </ul>
            `,
            visitNumber: 150,
            slug: "hoosh-masnoei-2023",
            writer: user._id, // Make sure user._id is defined
            image: "public\\uploads\\news\\news1.jpg",
            category: createdCategories.find(
                (cat) => cat.slug === "artificial-intelligence"
            )._id, // Adjust the category lookup as necessary
            tags: tagIds.slice(0, 3),
            comments: commentIds.slice(0, 3),
            publishDate: new Date(),
            specialDate: new Date(),
        },
        {
            title: "بلاک چین و تأثیر آن بر اقتصاد جهانی",
            description: `
                <h2>بلاک چین: انقلابی در اقتصاد دیجیتال</h2>
                <p>مقاله‌ای جامع درباره <em>چگونگی تأثیرگذاری بلاک چین</em> بر <strong>اقتصاد جهانی</strong> و <mark>تجارت الکترونیک</mark>.</p>
                <img src="http://127.0.0.1:8000\\public\\uploads\\news\\news1.jpg" alt="بلاک چین" style="width: 100%">
                <p>بلاک چین فراتر از ارزهای دیجیتال، به عنوان یک سیستم مالی متمرکز جدید شکل‌گیری می‌کند. <a href='#'>ادامه مطلب...</a></p>
                <ol>
                    <li>امنیت در بلاک چین</li>
                    <li>بلاک چین در صنایع مختلف</li>
                    <li>آینده ارزهای دیجیتال</li>
                </ol>
            `,
            visitNumber: 200,
            slug: "blockchain-va-eghtesad",
            writer: user._id, // Make sure user._id is defined
            image: "public\\uploads\\news\\news2.jpg",
            category: createdCategories.find((cat) => cat.slug === "blockchain")
                ._id, // Adjust the category lookup as necessary
            tags: tagIds.slice(2, 5),
            comments: commentIds.slice(4, 6),
            publishDate: new Date(),
            specialDate: new Date(),
        },

        {
            title: "پیشرفت‌های جدید در نورومورفیک کامپیوتینگ",
            description: `
                <h2>نسل بعدی پردازش: کامپیوترهای نورومورفیک</h2>
                <p>کشف اینکه چگونه <strong>کامپیوترهای نورومورفیک</strong> می‌توانند <em>پردازش داده‌ها</em> را مانند مغز انسان بهبود ببخشند.</p>
                <img src="http://127.0.0.1:8000\\public\\uploads\\news\\news4.png" alt="نورومورفیک کامپیوتینگ" style="width: 100%">
                <p>این فناوری جدید که از معماری مغز الهام گرفته شده است، قادر است تا عملیات‌های پیچیده‌تری را در مقایسه با کامپیوترهای سنتی انجام دهد. <a href='#'>بیشتر بدانید...</a></p>
                <ul>
                    <li>پردازش اطلاعات بیومیمتیک</li>
                    <li>الگوریتم‌های مبتنی بر مغز</li>
                    <li>کاربردهای نورومورفیک در هوش مصنوعی</li>
                </ul>
            `,
            visitNumber: 220,
            slug: "neuromorphic-computing",
            writer: user._id,
            image: "public\\uploads\\news\\news3.jpg",
            category: createdCategories.find(
                (cat) => cat.slug === "artificial-intelligence"
            )._id,
            tags: tagIds.slice(1, 4),
            comments: commentIds.slice(1, 3),
            publishDate: new Date(),
            specialDate: new Date(),
        },
        {
            title: "کاربردهای بلاک چین فراتر از ارزهای دیجیتال",
            description: `
                <h2>کاربردهای نوآورانه بلاک چین در صنایع مختلف</h2>
                <p>بررسی <em>کاربردهای گسترده بلاک چین</em> فراتر از <strong>مفهوم ارزهای دیجیتال</strong> و تأثیر آن‌ها بر دنیای ما.</p>
                <img src="http://127.0.0.1:8000\\public\\uploads\\news\\news3.jpg" alt="کاربردهای بلاک چین" style="width: 100%">
                <p>بلاک چین نه تنها جنبه‌های مالی، بلکه سیستم‌های رأی‌گیری، مدیریت زنجیره تأمین و موارد دیگر را نیز متحول کرده است. <a href='#'>مطالعه کنید...</a></p>
                <ol>
                    <li>بلاک چین در مدیریت زنجیره تأمین</li>
                    <li>بلاک چین برای تأیید اصالت محصولات</li>
                    <li>تأثیر بلاک چین بر حوزه رأی‌گیری و انتخابات</li>
                </ol>
            `,
            visitNumber: 180,
            slug: "blockchain-applications",
            writer: user._id,
            image: "public\\uploads\\news\\news4.png",
            category: createdCategories.find((cat) => cat.slug === "blockchain")
                ._id,
            tags: tagIds.slice(3, 6),
            comments: commentIds.slice(3, 5),
            publishDate: new Date(),
            specialDate: new Date(),
        },
        {
            title: "تحول دیجیتال با تکنولوژی بلاک چین",
            description: `
                <h2>چگونه بلاک چین دنیای تجارت دیجیتال را متحول می‌کند</h2>
                <p>در این مقاله، به <strong>تأثیر عمیق بلاک چین</strong> بر صنایع مختلف و <em>نوآوری‌هایی</em> که این تکنولوژی به همراه آورده است، می‌پردازیم.</p>
                <img src="http://127.0.0.1:8000\\public\\uploads\\news\\news6.png" alt="تحول دیجیتال با بلاک چین" style="width: 100%">
                <p>از امنیت افزایش یافته تا شفافیت بی‌نظیر در تراکنش‌ها، بلاک چین به سرعت در حال تبدیل شدن به یکی از مهم‌ترین فناوری‌های این دهه است. <a href='#'>جزئیات بیشتر...</a></p>
                <ul>
                    <li>امنیت بلاک چین و تأثیر آن بر صنایع</li>
                    <li>بلاک چین و تحول در مدیریت داده‌ها</li>
                    <li>کاربردهای جدید بلاک چین در تکنولوژی مالی</li>
                </ul>
            `,
            visitNumber: 250,
            slug: "digital-transformation-blockchain",
            writer: user._id,
            image: "public\\uploads\\news\\news5.png",
            category: createdCategories.find((cat) => cat.slug === "blockchain")
                ._id,
            tags: tagIds.slice(4, 7),
            comments: commentIds.slice(5, 7),
            publishDate: new Date(),
            specialDate: new Date(),
        },
        {
            title: "مرزهای جدید در پردازش زبان طبیعی",
            description: `
                <h2>پیشرفت‌های اخیر در تکنولوژی پردازش زبان طبیعی (NLP)</h2>
                <p>این مقاله به بررسی <em>نوآوری‌های جدید در حوزه NLP</em> می‌پردازد و اینکه چگونه می‌توانند تعامل انسان و ماشین را <strong>ساده‌تر و طبیعی‌تر</strong> کنند.</p>
                <img src="http://127.0.0.1:8000\\public\\uploads\\news\\news5.png" alt="پردازش زبان طبیعی" style="width: 100%">
                <p>از الگوریتم‌های پیشرفته تا درک متون پیچیده، NLP در حال باز کردن دروازه‌های جدیدی در فهم ماشین از زبان انسان است. <a href='#'>اطلاعات بیشتر...</a></p>
                <ol>
                    <li>تکنیک‌های جدید در ترجمه ماشینی</li>
                    <li>چالش‌های موجود در درک متون بوسیله ماشین‌ها</li>
                    <li>کاربرد NLP در سیستم‌های پاسخگویی خودکار</li>
                </ol>
            `,
            visitNumber: 300,
            slug: "frontiers-in-nlp",
            writer: user._id,
            image: "public\\uploads\\news\\news6.png",
            category: createdCategories.find(
                (cat) => cat.slug === "artificial-intelligence"
            )._id,
            tags: tagIds.slice(2, 5),
            comments: commentIds.slice(6, 8),
            publishDate: new Date(),
            specialDate: new Date(),
        },
    ];

    try {
        await News.deleteMany({});
        await News.insertMany(newsData);
        console.log("News seeded successfully!");
    } catch (error) {
        console.error("Error seeding news:", error);
    }
};

// This function can then be executed in your seeding script or process.
