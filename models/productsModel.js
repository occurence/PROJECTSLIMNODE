import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    categories: {
        type: String,
        required: [true, 'Set categories for product'],
    },
    weight: {
        type: Number,
        required: [true, 'Set weight for product'],
    },
    title: {
        type: String,
        required: [true, 'Set title for product'],
        index: 1,
    },
    calories: {
        type: Number,
        required: [true, 'Set calories for product'],
    },
    groupBloodNotAllowed: {
        type: Map,
        of: Boolean,
        default: {0: null},
    },
});

const Product = model("product", productSchema);

export { Product };