const { Invoice, InvoiceItem } = require('../models/invoiceModel');
const Product = require('../models/productModel');

exports.createInvoice = async (req, res) => {
    try {
        const { products } = req.body; // [{ productId: 1, quantity: 2 }, ...]

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Products array is required' });
        }

        let total = 0;
        const invoice = await Invoice.create();

        const invoiceItems = await Promise.all(products.map(async (item) => {
            const product = await Product.findByPk(item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }

            const subtotal = product.price * item.quantity;
            total += subtotal;

            return {
                InvoiceId: invoice.id,
                ProductId: product.id,
                quantity: item.quantity,
                subtotal
            };
        }));

        await InvoiceItem.bulkCreate(invoiceItems);
        await invoice.update({ total });

        res.status(201).json({ message: 'Invoice created', invoice, items: invoiceItems });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.findAll({ include: { model: InvoiceItem, as: 'items' } });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};