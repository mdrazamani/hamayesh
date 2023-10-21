import mongoose from "mongoose";

// const importantDatesTypes = [];
// const costTypes = ["register"];

const hamayeshDetailSchema = new mongoose.Schema(
    {
        faTitle: {
            type: String,
            required: true,
        },
        enTitle: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        iscCode: {
            type: String,
            required: true,
        },
        aboutHtml: {
            type: String,
        },
        poster: {
            type: String,
        },
        eventAddress: {
            state: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "State",
            },
            city: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "City",
            },
            address: {
                type: String,
                required: true,
                trim: true,
            },
            longitude: {
                type: Number,
            },
            latitude: {
                type: Number,
            },
        },
    },
    { timestamps: true }
);

hamayeshDetailSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
    },
});

//پیدا کردن بدون نیاز به id
// we need to this............................................................................................................
// hamayeshDetailSchema.pre(/^find/, function (next) {
//     this.findOne();
//     next();
// });

const HamayeshDetail = mongoose.model("HamayeshDetail", hamayeshDetailSchema);

export default HamayeshDetail;
