import mongoose from "mongoose";

//--

// is not good!

//--
//--
//--
//--
//--

//--
//--
//--
//--
//--

//--
//--
//--
//--
//--

//--
//--
//--
//--
//--
//--
//--
//--
//--

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
        iscCode: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        aboutHtml: {
            type: String,
        },
        Longitude: {
            type: Number,
        },
        latitude: {
            type: Number,
        },
        eventAddress: {
            state: {
                type: String,
                required: true,
                trim: true,
            },
            city: {
                type: String,
                required: true,
                trim: true,
            },
            address: {
                type: String,
                required: true,
                trim: true,
            },
        },
        costs: [
            {
                costId: {
                    type: Number,
                },
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                },
                price: {
                    type: Number,
                    required: true,
                },
                lastDate: {
                    type: Date,
                    required: true,
                },
            },
        ],
        importantAxes: [
            {
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                },
                parent: {
                    type: Number,
                    default: 0,
                },
                level: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        importantDates: [
            {
                importantDateId: {
                    type: Number,
                },
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                },
                data: {
                    type: Date,
                },
            },
        ],
    },
    { timestamps: true }
);

const HamayeshDetail = mongoose.model("HamayeshDetail", hamayeshDetailSchema);

export default HamayeshDetail;
