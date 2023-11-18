import News from "../../../app/models/news.model.mjs";
import User from "../../../app/models/user.model.mjs";
import { seedNewsCommentsFA } from "./newsComment.seeder.mjs"; // import the function from step 1
import { seedNewsTagsFA } from "./newsTag.seeder.mjs";
import { seedNewsCategoriesFA } from "./newsCategory.seeder.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

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
            &lt;h2&gt;نگاهی به پیشرفت‌های چشمگیر هوش مصنوعی در سال 2023&lt;/h2&gt;
            &lt;p&gt;در این مقاله، &lt;strong&gt;آخرین پیشرفت‌های&lt;/strong&gt; هوش مصنوعی را بررسی می‌کنیم، از یادگیری عمیق تا پردازش زبان طبیعی.&lt;/p&gt;
            &lt;img src="http://127.0.0.1:8000/public/uploads/news/news2.jpg" alt="هوش مصنوعی" style="width: 100%"&gt;
            &lt;p&gt;هوش مصنوعی (AI) در حال تغییر چهره صنایع مختلف است، از بهداشت و درمان گرفته تا خودروسازی و مالی. &lt;a href='#'&gt;بیشتر بخوانید...&lt;/a&gt;&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;پیشرفت‌ها در الگوریتم‌های یادگیری ماشین&lt;/li&gt;
                &lt;li&gt;نوآوری‌ها در روباتیک&lt;/li&gt;
                &lt;li&gt;کاربرد هوش مصنوعی در تشخیص بیماری‌ها&lt;/li&gt;
            &lt;/ul&gt;`,
            visitNumber: 150,
            slug: "hoosh-masnoei-2023",
            writer: user._id, // Make sure user._id is defined
            image: "public/uploads/news/news1.jpg",
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
            &lt;h2&gt;بلاک چین: انقلابی در اقتصاد دیجیتال&lt;/h2&gt;
            &lt;p&gt;مقاله‌ای جامع درباره &lt;em&gt;چگونگی تأثیرگذاری بلاک چین&lt;/em&gt; بر &lt;strong&gt;اقتصاد جهانی&lt;/strong&gt; و &lt;mark&gt;تجارت الکترونیک&lt;/mark&gt;.&lt;/p&gt;
            &lt;img src="http://127.0.0.1:8000/public/uploads/news/news1.jpg" alt="بلاک چین" style="width: 100%"&gt;
            &lt;p&gt;بلاک چین فراتر از ارزهای دیجیتال، به عنوان یک سیستم مالی متمرکز جدید شکل‌گیری می‌کند. &lt;a href='#'&gt;ادامه مطلب...&lt;/a&gt;&lt;/p&gt;
            &lt;ol&gt;
                &lt;li&gt;امنیت در بلاک چین&lt;/li&gt;
                &lt;li&gt;بلاک چین در صنایع مختلف&lt;/li&gt;
                &lt;li&gt;آینده ارزهای دیجیتال&lt;/li&gt;
            &lt;/ol&gt;            
            `,
            visitNumber: 200,
            slug: "blockchain-va-eghtesad",
            writer: user._id, // Make sure user._id is defined
            image: "public/uploads/news/news2.jpg",
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
            &lt;h2&gt;نسل بعدی پردازش: کامپیوترهای نورومورفیک&lt;/h2&gt;
            &lt;p&gt;کشف اینکه چگونه &lt;strong&gt;کامپیوترهای نورومورفیک&lt;/strong&gt; می‌توانند &lt;em&gt;پردازش داده‌ها&lt;/em&gt; را مانند مغز انسان بهبود ببخشند.&lt;/p&gt;
            &lt;img src="http://127.0.0.1:8000/public/uploads/news/news4.png" alt="نورومورفیک کامپیوتینگ" style="width: 100%"&gt;
            &lt;p&gt;این فناوری جدید که از معماری مغز الهام گرفته شده است، قادر است تا عملیات‌های پیچیده‌تری را در مقایسه با کامپیوترهای سنتی انجام دهد. &lt;a href='#'&gt;بیشتر بدانید...&lt;/a&gt;&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;پردازش اطلاعات بیومیمتیک&lt;/li&gt;
                &lt;li&gt;الگوریتم‌های مبتنی بر مغز&lt;/li&gt;
                &lt;li&gt;کاربردهای نورومورفیک در هوش مصنوعی&lt;/li&gt;
            &lt;/ul&gt;
            `,
            visitNumber: 220,
            slug: "neuromorphic-computing",
            writer: user._id,
            image: "public/uploads/news/news3.jpg",
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
            &lt;h2&gt;کاربردهای نوآورانه بلاک چین در صنایع مختلف&lt;/h2&gt;
            &lt;p&gt;بررسی &lt;em&gt;کاربردهای گسترده بلاک چین&lt;/em&gt; فراتر از &lt;strong&gt;مفهوم ارزهای دیجیتال&lt;/strong&gt; و تأثیر آن‌ها بر دنیای ما.&lt;/p&gt;
            &lt;img src="http://127.0.0.1:8000/public/uploads/news/news3.jpg" alt="کاربردهای بلاک چین" style="width: 100%"&gt;
            &lt;p&gt;بلاک چین نه تنها جنبه‌های مالی، بلکه سیستم‌های رأی‌گیری، مدیریت زنجیره تأمین و موارد دیگر را نیز متحول کرده است. &lt;a href='#'&gt;مطالعه کنید...&lt;/a&gt;&lt;/p&gt;
            &lt;ol&gt;
                &lt;li&gt;بلاک چین در مدیریت زنجیره تأمین&lt;/li&gt;
                &lt;li&gt;بلاک چین برای تأیید اصالت محصولات&lt;/li&gt;
                &lt;li&gt;تأثیر بلاک چین بر حوزه رأی‌گیری و انتخابات&lt;/li&gt;
            &lt;/ol&gt;            
            `,
            visitNumber: 180,
            slug: "blockchain-applications",
            writer: user._id,
            image: "public/uploads/news/news4.png",
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
            &lt;h2&gt;چگونه بلاک چین دنیای تجارت دیجیتال را متحول می‌کند&lt;/h2&gt;
            &lt;p&gt;در این مقاله، به &lt;strong&gt;تأثیر عمیق بلاک چین&lt;/strong&gt; بر صنایع مختلف و &lt;em&gt;نوآوری‌هایی&lt;/em&gt; که این تکنولوژی به همراه آورده است، می‌پردازیم.&lt;/p&gt;
            &lt;img src="http://127.0.0.1:8000/public/uploads/news/news6.png" alt="تحول دیجیتال با بلاک چین" style="width: 100%"&gt;
            &lt;p&gt;از امنیت افزایش یافته تا شفافیت بی‌نظیر در تراکنش‌ها، بلاک چین به سرعت در حال تبدیل شدن به یکی از مهم‌ترین فناوری‌های این دهه است. &lt;a href='#'&gt;جزئیات بیشتر...&lt;/a&gt;&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;امنیت بلاک چین و تأثیر آن بر صنایع&lt;/li&gt;
                &lt;li&gt;بلاک چین و تحول در مدیریت داده‌ها&lt;/li&gt;
                &lt;li&gt;کاربردهای جدید بلاک چین در تکنولوژی مالی&lt;/li&gt;
            &lt;/ul&gt;            
            `,
            visitNumber: 250,
            slug: "digital-transformation-blockchain",
            writer: user._id,
            image: "public/uploads/news/news5.png",
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
            &lt;h2&gt;پیشرفت‌های اخیر در تکنولوژی پردازش زبان طبیعی (NLP)&lt;/h2&gt;
            &lt;p&gt;این مقاله به بررسی &lt;em&gt;نوآوری‌های جدید در حوزه NLP&lt;/em&gt; می‌پردازد و اینکه چگونه می‌توانند تعامل انسان و ماشین را &lt;strong&gt;ساده‌تر و طبیعی‌تر&lt;/strong&gt; کنند.&lt;/p&gt;
            &lt;img src="http://127.0.0.1:8000/public/uploads/news/news5.png" alt="پردازش زبان طبیعی" style="width: 100%"&gt;
            &lt;p&gt;از الگوریتم‌های پیشرفته تا درک متون پیچیده، NLP در حال باز کردن دروازه‌های جدیدی در فهم ماشین از زبان انسان است. &lt;a href='#'&gt;اطلاعات بیشتر...&lt;/a&gt;&lt;/p&gt;
            &lt;ol&gt;
                &lt;li&gt;تکنیک‌های جدید در ترجمه ماشینی&lt;/li&gt;
                &lt;li&gt;چالش‌های موجود در درک متون بوسیله ماشین‌ها&lt;/li&gt;
                &lt;li&gt;کاربرد NLP در سیستم‌های پاسخگویی خودکار&lt;/li&gt;
            &lt;/ol&gt;            
            `,
            visitNumber: 300,
            slug: "frontiers-in-nlp",
            writer: user._id,
            image: "public/uploads/news/news6.png",
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
        // await News.insertMany(newsData);
        await insertDocumentsDynamically(News, newsData);
        console.log("News seeded successfully!");
    } catch (error) {
        console.error("Error seeding news:", error);
    }
};

// This function can then be executed in your seeding script or process.
