const { Invoice, InvoiceItem } = require('../models/invoiceModel');
const Product = require('../models/productModel');

const createInvoice = async (products) => {
    if (!products || !Array.isArray(products) || products.length === 0) {
        throw new Error('Products array is required');
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

    return { invoice, invoiceItems };
};

const getAllInvoices = async () => {
    return await Invoice.findAll({ include: { model: InvoiceItem, as: 'items' } });
};

const getInvoiceById = async (id) => {
    const invoice = await Invoice.findByPk(id, { include: { model: InvoiceItem, as: 'items' } });
    if (!invoice) {
        throw new Error('Invoice not found');
    }
    return invoice;
};

const updateInvoice = async (id, products) => {
    if (!products || !Array.isArray(products) || products.length === 0) {
        throw new Error('Products array is required');
    }

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
        throw new Error('Invoice not found');
    }

    let total = 0;
    await InvoiceItem.destroy({ where: { InvoiceId: invoice.id } });

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
    await invoice.update({ total });

    return { invoice, invoiceItems };
};

const deleteInvoice = async (id) => {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
        throw new Error('Invoice not found');
    }
    await InvoiceItem.destroy({ where: { InvoiceId: invoice.id } });
    await invoice.destroy();
};

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
};
