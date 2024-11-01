import { Schema, model } from 'mongoose';

const todaySchema = new Schema({
    user: {
        type: String,
        required: [true, 'Set user for entry'],
        index: true,
    },
    date: {
        type: String,
        required: [true, 'Set date for entry'],
        index: true,
    },
    height: {
        type: Number,
        required: [true, 'Set height as of today'],
    },
    age: {
        type: Number,
        required: [true, 'Set age as of today'],
    },
    weight: {
        type: Number,
        required: [true, 'Set weight as of today'],
    },
    weightDesired: {
        type: Number,
        required: [true, 'Set desired weight'],
    },
    blood: {
        type: Number,
        required: [true, 'Set blood type'],
    },
    dailyRate: {
        type: Number,
        required: [true, 'Set dailyRate'],
    },
    consumed: {
        type: Number,
        default: null,
    },
    left: {
        type: Number,
        default: null,
    },
    percentage: {
        type: Number,
        default: 0,
    },
    // products: {
    //     type: Map,
    //     of: Number,
    //     default: null,
    // },
    products: {
        type: [{
            productId: {
                type: String,
                default: null,
            },
            productName: {
                type: String,
                default: null,
            },
            grams: {
                type: Number,
                default: null,
            },
        }]
    }
});

todaySchema.index({ user: 1, date: 1 }, { unique: true });

const Today = model("today", todaySchema);

export { Today };