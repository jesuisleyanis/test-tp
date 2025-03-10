const Product = require('../models/productModel');

const getAllProducts = async () => {
    return await Product.findAll();
};

const getProductById = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};

const createProduct = async (libelle, price) => {
    if (!libelle || !price) {
        throw new Error('Libelle and price are required');
    }
    return await Product.create({ libelle, price });
};

const updateProduct = async (id, libelle, price) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw new Error('Product not found');
    }
    await product.update({ libelle, price });
    return product;
};

const deleteProduct = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw new Error('Product not found');
    }
    await product.destroy();
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
