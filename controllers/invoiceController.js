const invoiceService = require('../services/invoiceService');

exports.createInvoice = async (req, res) => {
    try {
        const { products } = req.body;
        const { invoice, invoiceItems } = await invoiceService.createInvoice(products);
        res.status(201).json({ message: 'Invoice created', invoice, items: invoiceItems });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await invoiceService.getAllInvoices();
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await invoiceService.getInvoiceById(req.params.id);
        res.json(invoice);
    } catch (error) {
        res.status(error.message === 'Invoice not found' ? 404 : 500).json({ error: error.message });
    }
};

exports.updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { products } = req.body;
        const { invoice, invoiceItems } = await invoiceService.updateInvoice(id, products);
        res.status(200).json({ message: 'Invoice updated', invoice, items: invoiceItems });
    } catch (error) {
        res.status(error.message === 'Invoice not found' ? 404 : 500).json({ error: error.message });
    }
};

exports.deleteInvoice = async (req, res) => {
    try {
        await invoiceService.deleteInvoice(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(error.message === 'Invoice not found' ? 404 : 500).json({ error: error.message });
    }
};
