const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    libelle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: false
    }
}, {
    timestamps: true
});

module.exports = Product;
