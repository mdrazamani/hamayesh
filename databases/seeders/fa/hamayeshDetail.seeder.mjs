import HamayeshDetail from "../../../app/models/hamayeshDetail.model.mjs";
import State from "../../../app/models/state.model.mjs";
import City from "../../../app/models/city.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

export const seedHamayeshDetailFA = async () => {
    try {
        const state = await State.findOne({ state: "البرز" });
        const city = await City.findOne({ city: "کرج" });

        if (!state || !city) {
            throw new Error("استان یا شهر مورد نظر یافت نشد.");
        }

        const teasersData = [
            {
                title: "خرگوش آدمنما",
                description: "خرگوش که خمیازه می کشد!",
                path: "public/uploads/teaser/test.mp4",
                cover: "public/uploads/teaser/poster.jpeg",
            },
        ];

        const hamayeshDetails = [
            {
                faTitle: "نهمین همایش بین المللی هوش مصنوعی و بلاک چین",
                enTitle:
                    "The Ninth International Conference on AI and Blockchain",
                description:
                    "همایش بین‌المللی پیشرفت‌ها و نوآوری‌ها در صنعت نفت و گاز با هدف گردآوری متخصصان، دانشمندان و پیشگامان صنعت از سراسر جهان برگزار گردید. در این رویداد سه‌روزه، بیش از ۵۰ سخنرانی تخصصی، کارگاه‌های آموزشی و پنل‌های بحث و گفتگو در زمینه‌های مختلفی از جمله اکتشاف و تولید، فرآوری و پالایش، ایمنی و محیط زیست، اقتصاد نفت و گاز، و نوآوری‌های فناورانه در این صنعت انجام شد.",
                iscCode: "123659845",
                aboutHtml: `&lt;div class="container" style="text-align: right; direction: rtl"&gt;
                &lt;header class="conference-header" style="margin-bottom: 20px;"&gt;
                    &lt;h1 style="font-size: 2.5em; margin-bottom: 10px; color: #005792;"&gt;نهمین همایش بین‌المللی هوش مصنوعی و بلاک چین&lt;/h1&gt;
                    &lt;p style="font-size: 1.1em; color: #666;"&gt;یک رویداد فاخر برای نمایش پیشرفت‌های اخیر و بحث در مورد آینده صنعت&lt;/p&gt;
                &lt;/header&gt;
                &lt;section class="section" style="margin-bottom: 20px;"&gt;
                    &lt;h2 style="font-size: 1.8em; margin-bottom: 10px; color: #027368;"&gt;درباره همایش&lt;/h2&gt;
                    &lt;p style="text-indent: 40px;"&gt;نهمین همایش بین‌المللی هوش مصنوعی و بلاک چین با هدف گردهم‌آوری متخصصین، تحلیل‌گران، و پیشروان صنعت از سرتاسر جهان برای اشتراک گذاری دانش، تجربیات و دستاوردهای جدید، به عنوان بزرگترین رویداد تخصصی منطقه در حوزه انرژی برگزار می‌شود.&lt;/p&gt;
                &lt;/section&gt;
                &lt;section class="section" style="margin-bottom: 20px;"&gt;
                    &lt;h2 style="font-size: 1.8em; margin-bottom: 10px; color: #027368;"&gt;موضوعات کلیدی&lt;/h2&gt;
                    &lt;p style="text-indent: 40px;"&gt;این همایش به موضوعاتی چون &lt;span style="color: #d35400; font-weight: bold;"&gt;استراتژی‌های اکتشاف و تولید&lt;/span&gt;، &lt;span style="color: #d35400; font-weight: bold;"&gt;تکنولوژی‌های نوین در پالایش&lt;/span&gt;، &lt;span style="color: #d35400; font-weight: bold;"&gt;مدیریت پروژه‌های نفتی&lt;/span&gt;، و &lt;span style="color: #d35400; font-weight: bold;"&gt;چالش‌های زیست محیطی&lt;/span&gt; می‌پردازد.&lt;/p&gt;
                &lt;/section&gt;
                &lt;footer class="conference-footer"&gt;
                    &lt;p style="text-align: center; font-size: 1.1em;"&gt;برای کسب اطلاعات بیشتر و ثبت نام در همایش، لطفا به وب‌سایت ما مراجعه کنید.&lt;/p&gt;
                &lt;/footer&gt;
            &lt;/div&gt;`,
                poster: "public/uploads/poster/poster.jpeg",
                teasers: teasersData,
                headerImage: "public/uploads/headerImage/test.png",
                eventAddress: {
                    state: state._id,
                    city: city._id,
                    address: "شاهین ویلا، بنیاد 22 بهمن جنوبی",
                    longitude: 123456,
                    latitude: 654321,
                },
                writingArticles: {
                    description: `&lt;article&gt;
                    &lt;header&gt;
                        &lt;h1&gt;دستورالعمل برای نوشتن مقالات&lt;/h1&gt;
                    &lt;/header&gt;
                    &lt;br/&gt;
                    &lt;section&gt;
                        &lt;h2&gt;مقدمه&lt;/h2&gt;
                        &lt;br/&gt;
                        &lt;p&gt;نوشتن مقالات یک هنر است که با تمرین و پیروی از برخی دستورالعمل‌های مشخص، می‌توانید در آن تبحر پیدا کنید. در این دستورالعمل سعی داریم تا نکات مهمی که باید در نوشتن مقالات رعایت کنید را بیان نماییم.&lt;/p&gt;
                        &lt;br/&gt;
                    &lt;/section&gt;
                    &lt;section&gt;
                        &lt;h2&gt;انتخاب موضوع&lt;/h2&gt;
                        &lt;br/&gt;
                        &lt;p&gt;انتخاب موضوع مناسب اولین و مهم‌ترین قدم در نوشتن مقاله است. موضوع باید جذاب، به روز و مرتبط با علاقه‌مندی‌های شما باشد.&lt;/p&gt;
                        &lt;br/&gt;
                    &lt;/section&gt;
                    &lt;section&gt;
                        &lt;h2&gt;تحقیق و جمع‌آوری اطلاعات&lt;/h2&gt;
                        &lt;br/&gt;
                        &lt;p&gt;پیش از شروع به نوشتن، تحقیقات کافی انجام دهید. استفاده از منابع معتبر و به روز، به ارتقاء کیفیت مقاله شما کمک می‌کند.&lt;/p&gt;
                        &lt;br/&gt;
                    &lt;/section&gt;
                    &lt;section&gt;
                        &lt;h2&gt;طرح‌ریزی و سازماندهی&lt;/h2&gt;
                        &lt;br/&gt;
                        &lt;p&gt;یک طرح کلی از مقاله خود تهیه کنید. این کار به شما کمک می‌کند تا افکار خود را سازماندهی و مطمئن شوید که تمام نکات مهم را پوشش داده‌اید.&lt;/p&gt;
                        &lt;br/&gt;
                    &lt;/section&gt;
                    &lt;section&gt;
                        &lt;h2&gt;نگارش&lt;/h2&gt;
                        &lt;br/&gt;
                        &lt;p&gt;با توجه به طرح خود شروع به نگارش کنید. مقدمه‌ای جذاب بنویسید، محتوا را به طور منطقی توسعه دهید و با نتیجه‌گیری قوی پایان بدهید.&lt;/p&gt;
                        &lt;br/&gt;
                    &lt;/section&gt;
                    &lt;section&gt;
                        &lt;h2&gt;ویرایش و بازبینی&lt;/h2&gt;
                        &lt;br/&gt;
                        &lt;p&gt;پس از اتمام نگارش، متن خود را چندین بار ویرایش کنید. توجه به گرامر، املاء و سبک نگارش اهمیت زیادی دارد.&lt;/p&gt;
                        &lt;br/&gt;
                    &lt;/section&gt;
                    &lt;footer&gt;
                        &lt;br/&gt;
                        &lt;p&gt;امیدواریم که این دستورالعمل‌ها به شما در نوشتن مقالات بهتر کمک کنند. موفق باشید!&lt;/p&gt;
                        &lt;br/&gt;
                    &lt;/footer&gt;
                &lt;/article&gt;
                `,
                    files: [
                        {
                            title: "ورد",
                            image: "public/uploads/writingArticles/word.jpg",
                            format: "doc",
                            description: "فایل word",
                            path: "",
                        },
                        {
                            title: "پاورپوینت",
                            image: "public/uploads/writingArticles/powerpoint.png",
                            format: "ppt",
                            description: "فایل powerpoint",
                            path: "",
                        },
                        {
                            title: "پی دی اف",
                            image: "public/uploads/writingArticles/pdf.png",
                            format: "pdf",
                            description: "فایل pdf",
                            path: "",
                        },
                    ],
                },
                dates: {
                    start: new Date(+new Date() + 10368000000),
                    end: new Date(+new Date() + 10398000000),
                    startArticle: new Date(+new Date() - 10398000000),
                    endArticle: new Date(+new Date() + 10598000000),
                    refeeResult: new Date(+new Date() + 10698000000),
                    editArticle: new Date(+new Date() + 10798000000),
                    lastRegistration: new Date(+new Date() + 10898000000),
                },
            },
        ];

        await HamayeshDetail.deleteMany({});
        // await HamayeshDetail.insertMany(hamayeshDetails);
        await insertDocumentsDynamically(HamayeshDetail, hamayeshDetails);

        console.log("HamayeshDetail seeded successfully!");
    } catch (error) {
        console.error("خطا در seed کردن HamayeshDetail:", error);
    }
};
