const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    product_name: {type: String, required: true},
    product_features: {type: String, required: true},
    product_description: {type: String, required: true},
    product_images: [
        {type: String, required: true}
    ],
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    publishDate: Date,
    updatedAt: Date,
}, {timestamps: true});

module.exports = mongoose.model('product', productSchema);