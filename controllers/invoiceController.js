const { Invoice, InvoiceItem } = require('../models/invoiceModel');
const Product = require('../models/productModel');

// Create new invoice
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

// Get all invoices
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.findAll({ include: { model: InvoiceItem, as: 'items' } });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id, { include: { model: InvoiceItem, as: 'items' } });
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        await InvoiceItem.destroy({ where: { InvoiceId: invoice.id } });
        await invoice.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
