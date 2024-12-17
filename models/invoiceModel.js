const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');


const Invoice = sequelize.define('Invoice', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    timestamps: true
});

module.exports = Invoice;
