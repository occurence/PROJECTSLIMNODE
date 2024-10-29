import { Schema, model } from 'mongoose';

const todaySchema = new Schema({
    date: {
        type: Date,
        required: [true, 'Set date for entry'],
        unique: true,
        index: 1,
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
        default: null,
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
    product: {
        type: Map,
        of: Number,
        default: null,
    },
});

const Today = model("today", todaySchema);

export { Today };