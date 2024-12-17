const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Product = require('./productModel.js');
const Invoice = require('./invoiceModel.js');

const ProductInvoice = sequelize.define('ProductInvoice', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Relations
ProductInvoice.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Product.hasMany(ProductInvoice, { foreignKey: 'productId', as: 'productInvoices' });

ProductInvoice.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
Invoice.hasMany(ProductInvoice, { foreignKey: 'invoiceId', as: 'productInvoices' });

module.exports = ProductInvoice;
