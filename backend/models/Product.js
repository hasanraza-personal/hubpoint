const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    productLink: {
        type: String,
        required: true
    },
    productPhoto: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('product', ProductSchema);