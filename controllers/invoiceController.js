const Invoice = require('../models/invoiceModel');
const Product = require('../models/productModel');

exports.getAllInvoices = async (res) => {
    try {
        const invoices = await Invoice.findAll();
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createInvoice = async (req, res) => {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Le tableau de produits est requis et ne peut pas être vide.' });
    }

    try {
        const invoice = await Invoice.create({ totalAmount: 0 });

        let totalAmount = 0;
        const productCounts = {};
        products.forEach(product => {
            if (productCounts[product.id]) {
                productCounts[product.id]++;
            } else {
                productCounts[product.id] = 1;
            }
        });

        for (const [productId, quantity] of Object.entries(productCounts)) {
            const product = await Product.findByPk(productId);

            if (!product) {
                return res.status(404).json({ error: `Le produit avec l'ID ${productId} n'existe pas.` });
            }

            await invoice.addProduct(product, { through: { quantity } });

            totalAmount += product.price * quantity;
        }

        await invoice.update({ totalAmount });

        const invoiceWithProducts = await Invoice.findByPk(invoice.id, {
            include: {
                model: Product,
                as: 'products',
                through: { attributes: ['quantity'] },
            },
        });

        return res.status(201).json(invoiceWithProducts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.updateInvoice = async (req, res) => {
    try {
        const { date, total } = req.body;
        const invoice = await Invoice.findByPk(req.params.id);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        await invoice.update({ date, total });
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        await invoice.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
