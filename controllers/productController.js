const productService = require('../services/productService');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(error.message === 'Product not found' ? 404 : 500).json({ error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { libelle, price } = req.body;
        const newProduct = await productService.createProduct(libelle, price);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { libelle, price } = req.body;
        const updatedProduct = await productService.updateProduct(req.params.id, libelle, price);
        res.json(updatedProduct);
    } catch (error) {
        res.status(error.message === 'Product not found' ? 404 : 500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(error.message === 'Product not found' ? 404 : 500).json({ error: error.message });
    }
};
