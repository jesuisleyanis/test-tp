const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./productModel');

const Invoice = sequelize.define('Invoice', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    }
}, {
    timestamps: true
});

const InvoiceItem = sequelize.define('InvoiceItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    }
}, {
    timestamps: false
});

// Relations
Invoice.hasMany(InvoiceItem, { as: 'items' });
InvoiceItem.belongsTo(Invoice);
InvoiceItem.belongsTo(Product);

module.exports = { Invoice, InvoiceItem };
