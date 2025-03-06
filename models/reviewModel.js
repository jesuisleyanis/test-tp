const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Product = require('./Product');
const User = require('./User');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
}, {
    timestamps: true
});

Product.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE' });
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'productId' });
Review.belongsTo(User, { foreignKey: 'userId' });

module.exports = Review;
