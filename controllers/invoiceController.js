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

exports.updateInvoice = async (req, res) => {
    try {
        const { id } = req.params; // ID de la facture à mettre à jour
        const { products } = req.body; // Liste des produits [{ productId, quantity }]

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Products array is required' });
        }

        // Récupérer la facture existante
        const invoice = await Invoice.findByPk(id);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        let total = 0;

        // Supprimer les anciens articles de la facture
        await InvoiceItem.destroy({ where: { InvoiceId: invoice.id } });

        // Ajouter les nouveaux articles de facture
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
                subtotal,
            };
        }));

        await InvoiceItem.bulkCreate(invoiceItems);

        // Mettre à jour le total de la facture
        await invoice.update({ total });

        res.status(200).json({ message: 'Invoice updated', invoice, items: invoiceItems });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};