import HamayeshDetail from "../../../app/models/hamayeshDetail.model.mjs";
import State from "../../../app/models/state.model.mjs";
import City from "../../../app/models/city.model.mjs";

export const seedHamayeshDetailFA = async () => {
    try {
        const state = await State.findOne({ state: "البرز" });
        const city = await City.findOne({ city: "کرج" });

        if (!state || !city) {
            throw new Error("استان یا شهر مورد نظر یافت نشد.");
        }

        const hamayeshDetails = [
            {
                faTitle: "نهمین همایش بین المللی هوش مصنوعی و بلاک چین",
                enTitle:
                    "The Ninth International Conference on AI and Blockchain",
                description:
                    "همایش بین‌المللی پیشرفت‌ها و نوآوری‌ها در صنعت نفت و گاز با هدف گردآوری متخصصان، دانشمندان و پیشگامان صنعت از سراسر جهان برگزار گردید. در این رویداد سه‌روزه، بیش از ۵۰ سخنرانی تخصصی، کارگاه‌های آموزشی و پنل‌های بحث و گفتگو در زمینه‌های مختلفی از جمله اکتشاف و تولید، فرآوری و پالایش، ایمنی و محیط زیست، اقتصاد نفت و گاز، و نوآوری‌های فناورانه در این صنعت انجام شد.",
                iscCode: "123659845",
                aboutHtml: `
    <style>
    
        .conference-header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #005792;
        }

        .conference-header p {
            font-size: 1.1em;
            color: #666;
        }

        .section {
            margin-bottom: 20px;
        }

        .section h2 {
            font-size: 1.8em;
            margin-bottom: 10px;
            color: #027368;
        }

        .section p {
            text-indent: 40px;
        }

        .highlight {
            color: #d35400;
            font-weight: bold;
        }
    </style>



    <div class="container">
        <header class="conference-header">
            <h1>نهمین همایش بین‌المللی نفت و گاز</h1>
            <p>یک رویداد فاخر برای نمایش پیشرفت‌های اخیر و بحث در مورد آینده صنعت</p>
        </header>

        <section class="section">
            <h2>درباره همایش</h2>
            <p>نهمین همایش بین‌المللی نفت و گاز با هدف گردهم‌آوری متخصصین، تحلیل‌گران، و پیشروان صنعت از سرتاسر جهان برای اشتراک گذاری دانش، تجربیات و دستاوردهای جدید، به عنوان بزرگترین رویداد تخصصی منطقه در حوزه انرژی برگزار می‌شود.</p>
        </section>

        <section class="section">
            <h2>موضوعات کلیدی</h2>
            <p>این همایش به موضوعاتی چون <span class="highlight">استراتژی‌های اکتشاف و تولید</span>، <span class="highlight">تکنولوژی‌های نوین در پالایش</span>، <span class="highlight">مدیریت پروژه‌های نفتی</span>، و <span class="highlight">چالش‌های زیست محیطی</span> می‌پردازد.</p>
        </section>

        <!-- Additional sections can be added here -->

        <footer class="conference-footer">
            <p>برای کسب اطلاعات بیشتر و ثبت نام در همایش، لطفا به وب‌سایت ما مراجعه کنید.</p>
        </footer>
    </div>
 `,
                poster: "public\\uploads\\poster\\poster.jpeg",
                headerImage: "public/uploads/headerImage/test.png",
                eventAddress: {
                    state: state._id,
                    city: city._id,
                    address: "شاهین ویلا، بنیاد 22 بهمن جنوبی",
                    longitude: 123456,
                    latitude: 654321,
                },
                writingArticles: {
                    description: `<article><header><h1>دستورالعمل برای نوشتن مقالات</h1></header>
                    <br/>
                    <section><h2>مقدمه</h2><br/>
                    <p>نوشتن مقالات یک هنر است که با تمرین و پیروی از برخی دستورالعمل‌های مشخص، می‌توانید در آن تبحر پیدا کنید. در این دستورالعمل سعی داریم تا نکات مهمی که باید در نوشتن مقالات رعایت کنید را بیان نماییم.</p>
                    <br/></section><section><h2>انتخاب موضوع</h2><br/>
                    <p>انتخاب موضوع مناسب اولین و مهم‌ترین قدم در نوشتن مقاله است. موضوع باید جذاب، به روز و مرتبط با علاقه‌مندی‌های شما باشد.</p>
                    <br/></section><section><h2>تحقیق و جمع‌آوری اطلاعات</h2><br/>
                    <p>پیش از شروع به نوشتن، تحقیقات کافی انجام دهید. استفاده از منابع معتبر و به روز، به ارتقاء کیفیت مقاله شما کمک می‌کند.</p>
                    <br/></section><section><h2>طرح‌ریزی و سازماندهی</h2><br/>
                    <p>یک طرح کلی از مقاله خود تهیه کنید. این کار به شما کمک می‌کند تا افکار خود را سازماندهی و مطمئن شوید که تمام نکات مهم را پوشش داده‌اید.</p>
                    <br/></section><section><h2>نگارش</h2><br/>
                    <p>با توجه به طرح خود شروع به نگارش کنید. مقدمه‌ای جذاب بنویسید، محتوا را به طور منطقی توسعه دهید و با نتیجه‌گیری قوی پایان بدهید.</p>
                    <br/></section><section><h2>ویرایش و بازبینی</h2>
                    <br/><p>پس از اتمام نگارش، متن خود را چندین بار ویرایش کنید. توجه به گرامر، املاء و سبک نگارش اهمیت زیادی دارد.</p>
                    <br/></section><footer><br/>
                    <p>امیدواریم که این دستورالعمل‌ها به شما در نوشتن مقالات بهتر کمک کنند. موفق باشید!</p>
                    <br/></footer></article>`,
                    files: [
                        {
                            title: "ورد",
                            image: "public\\uploads\\writingArticles\\word.jpg",
                            format: "doc",
                            description: "فایل word",
                            path: "",
                        },
                        {
                            title: "پاورپوینت",
                            image: "public\\uploads\\writingArticles\\powerpoint.png",
                            format: "ppt",
                            description: "فایل powerpoint",
                            path: "",
                        },
                        {
                            title: "پی دی اف",
                            image: "public\\uploads\\writingArticles\\pdf.png",
                            format: "pdf",
                            description: "فایل pdf",
                            path: "",
                        },
                    ],
                },
                dates: {
                    start: new Date(+new Date() + 10368000000),
                    end: new Date(+new Date() + 10398000000),
                    startArticle: new Date(+new Date() + 10498000000),
                    endArticle: new Date(+new Date() + 10598000000),
                    refeeResult: new Date(+new Date() + 10698000000),
                    editArticle: new Date(+new Date() + 10798000000),
                    lastRegistration: new Date(+new Date() + 10898000000),
                },
            },
        ];

        await HamayeshDetail.deleteMany({});
        await HamayeshDetail.insertMany(hamayeshDetails);

        console.log("HamayeshDetail seeded successfully!");
    } catch (error) {
        console.error("خطا در seed کردن HamayeshDetail:", error);
    }
};
