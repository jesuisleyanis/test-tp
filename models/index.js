const Product = require('./productModel');
const Invoice = require('./invoiceModel');
const ProductInvoice = require('./productInvoiceModel');

ProductInvoice.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Product.hasMany(ProductInvoice, { foreignKey: 'productId', as: 'productInvoices' });

ProductInvoice.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
Invoice.hasMany(ProductInvoice, { foreignKey: 'invoiceId', as: 'productInvoices' });

module.exports = { Product, Invoice, ProductInvoice };
