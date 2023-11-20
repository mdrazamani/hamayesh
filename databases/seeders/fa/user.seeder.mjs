import User from "../../../app/models/user.model.mjs";
import casual from "casual";
import bcrypt from "bcrypt";
import Role from "../../../app/models/role.model.mjs";
import State from "../../../app/models/state.model.mjs";
import City from "../../../app/models/city.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

function generateNationalId() {
    const part1 = Math.floor(Math.random() * 999)
        .toString()
        .padStart(3, "0");
    const part2 = Math.floor(Math.random() * 999)
        .toString()
        .padStart(3, "0");
    const part3 = Math.floor(Math.random() * 99)
        .toString()
        .padStart(2, "0");
    return part1 + part2 + part3;
}

export const seedUsersFA = async () => {
    const adminRole = await Role.findOne({ name: "admin" });

    const userRole = await Role.findOne({ name: "user" });
    const state = await State.findOne({ state: "البرز" });
    const city = await City.findOne({ city: "کرج" });

    const degrees = ["کارشناسی", "کارشناسی ارشد", "دکتری"];
    const jobs = ["دکتری هوش مصنوعی", "مهندس بلاک چین", "مهندس نرم‌افزار"];

    const users = [
        // ... Your hardcoded users
    ];

    const firstNames = [
        "علی",
        "محمد",
        "حسین",
        "فاطمه",
        "زهرا",
        "محسن",
        "محمدرضا",
        "محسن",
    ];
    const lastNames = [
        "رضوی",
        "صادقی",
        "حسینی",
        "موسوی",
        "جعفری",
        "رضوانی",
        "زمانی",
        "رضوانی",
    ];

    const images = [
        "public/uploads/personal/prsonal1.jpg",
        "public/uploads/personal/prsonal2.jpg",
        "public/uploads/personal/prsonal3.jpg",
        "public/uploads/personal/prsonal4.jpg",
        "public/uploads/personal/prsonal5.jpg",
        "public/uploads/personal/prsonal6.jpg",
        "public/uploads/personal/prsonal7.jpg",
        "public/uploads/personal/prsonal7.jpg",
    ];
    const emails = [
        "mdrazamani@gmail.com",
        "mohammad@example.com",
        "hossein@example.com",
        "fateme@example.com",
        "zahra@example.com",
        "mahdi@example.com",
        "reza@example.com",
        "mohsen.rezvani.rad33@gmail.com",
    ];
    const phoneNumbers = [
        "09120000001",
        "09120000002",
        "09120000003",
        "09120000004",
        "09120000005",
        "09120000006",
        "09120000007",
        "09120000008",
    ];

    for (let i = 0; i < 8; i++) {
        const user = {
            firstName: firstNames[i],
            lastName: lastNames[i],
            phoneNumber: phoneNumbers[i],
            // password: await bcrypt.hash("1029Mmd1029@", 10),
            password: "1029Mmd1029@",
            email: emails[i],
            emailVerifiedAt: null,
            role:
                i === 0
                    ? {
                          id: adminRole._id,
                          name: adminRole.name, // Admin role name from the fetched role
                      }
                    : {
                          id: userRole._id,
                          name: userRole.name, // Admin role name from the fetched role
                      },

            profileImage: images[i % images.length],
            lastLoginAt: null,
            national_id: generateNationalId(),
            gender: i % 2 === 0 ? "male" : "female",
            study_field: "علوم کامپیوتر",
            degree: degrees[i % degrees.length],
            institute: "موسسه فناوری",
            job: jobs[i % jobs.length],
            state: state._id,
            city: city._id,
            deletedAt: null,
            socials: {
                facebook: null,
                twitter: null,
                linkedIn: null,
                whatsapp: phoneNumbers[i],
                telegram: null,
            },
            bio: "این یک توضیح کوتاه در مورد کاربر است.",
        };
        users.push(user);
    }

    try {
        await User.deleteMany({});
        // await User.insertMany(users);
        await insertDocumentsDynamically(User, users);
        console.log("users added");
    } catch (error) {
        console.error("error in user", error);
    }
};
