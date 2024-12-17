const Product = require('../models/productModel');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new product
exports.createProduct = async (req, res) => {
    try {
        const { libelle, price } = req.body;
        if (!libelle || !price) {
            return res.status(400).json({ error: 'Libelle and price are required' });
        }
        const newProduct = await Product.create({ libelle, price });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { libelle, price } = req.body;
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.update({ libelle, price });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
