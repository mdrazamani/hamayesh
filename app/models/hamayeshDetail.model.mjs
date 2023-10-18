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
        // costs: [
        //     {
        //         type: {
        //             type: String,
        //             required: true,
        //             enum: costTypes,
        //         },
        //         title: {
        //             type: String,
        //             required: true,
        //         },
        //         description: {
        //             type: String,
        //         },
        //         price: {
        //             type: Number,
        //             required: true,
        //         },
        //         lastDate: {
        //             type: Date,
        //             required: true,
        //         },
        //     },
        // ],
        // importantAxes: [ *******************
        //     {
        //         title: {
        //             type: String,
        //             required: true,
        //         },
        //         description: {
        //             type: String,
        //         },
        //         parent: {
        //             type: Number,
        //             default: 0,
        //         },
        //         level: {
        //             type: Number,
        //             default: 1,
        //         },
        //     },
        // ],
        // importantDates: [
        //     {
        //         type: {
        //             type: string,
        //             required: true,
        //             enum: importantDatesTypes,
        //         },
        //         title: {
        //             type: String,
        //             required: true,
        //         },
        //         description: {
        //             type: String,
        //         },
        //         data: {
        //             type: Date,
        //         },
        //     },
        // ],
    },
    { timestamps: true }
);

hamayeshDetailSchema.set("toJSON", {
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
    },
});

// we need to this............................................................................................................
// hamayeshDetailSchema.pre(/^find/, function (next) {
//     this.findOne();
//     next();
// });

const HamayeshDetail = mongoose.model("HamayeshDetail", hamayeshDetailSchema);

export default HamayeshDetail;
