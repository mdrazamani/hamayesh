import User from "../../../app/models/user.model.mjs";
import casual from "casual";
import bcrypt from "bcrypt";
import Role from "../../../app/models/role.model.mjs";
import State from "../../../app/models/state.model.mjs";
import City from "../../../app/models/city.model.mjs";

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

    const users2 = [];
    const users = [
        {
            firstName: "محمدرضا",
            lastName: "زمانی",
            phoneNumber: "09108494221",
            password: await bcrypt.hash("Password123@", 10),
            email: "mohsen.rezvani.rad33@gmail.com",
            emailVerifiedAt: null,
            role: {
                id: adminRole._id,
                name: adminRole.name,
            },
            profileImage: null,
            lastLoginAt: null,
            national_id: "0012345678",
            gender: "male",
            study_field: "علوم کامپیوتر",
            degree: "کارشناسی ارشد",
            institute: "موسسه فناوری",
            country: "ایران",
            job: "دکتری هوش مصنوعی",
            state: state._id,
            city: city._id,
            deletedAt: null,
        },

        {
            firstName: "محسن",
            lastName: "رضوانی",
            phoneNumber: "09330111568",
            password: await bcrypt.hash("Password123@", 10),
            email: "rezvani@example.com",
            emailVerifiedAt: null,
            role: {
                id: userRole._id,
                name: userRole.name,
            },
            profileImage: null,
            lastLoginAt: null,
            national_id: "0012345679",
            gender: "male",
            study_field: "علوم کامپیوتر",
            degree: "کارشناسی ارشد",
            institute: "موسسه فناوری",
            country: "ایران",
            job: "مهندس بلاک چین",
            state: state._id,
            city: city._id,
            deletedAt: null,
        },
    ];

    for (let i = 0; i < 50; i++) {
        const gender = casual.random_element(["male", "female"]);

        users.push({
            firstName: casual.first_name,
            lastName: casual.last_name,
            phoneNumber: casual.phone,
            password: await bcrypt.hash("Password123@", 10),
            email: casual.email,
            emailVerifiedAt: null,
            role: {
                id: userRole._id,
                name: userRole.name,
            },
            profileImage: casual.url,
            lastLoginAt: null,
            national_id: generateNationalId(),
            gender: gender,

            // ...
            study_field: casual.random_element([
                "علوم کامپیوتر",
                "مهندسی نرم‌افزار",
                "هوش مصنوعی",
                "مهندسی شبکه",
            ]),
            degree: casual.random_element([
                "کارشناسی",
                "کارشناسی ارشد",
                "دکتری",
            ]),
            institute: casual.company_name,
            country: "ایران",
            job: casual.title,
            state: state._id,
            city: city._id,
            deletedAt: null,
        });
    }

    try {
        await User.deleteMany({});
        await User.insertMany(users);
        console.log("کاربران با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن کاربران:", error);
    }
};
