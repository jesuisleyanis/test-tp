const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

class ReviewService {
    static async createReview({ userId, productId, rating, comment }) {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Produit introuvable.');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Utilisateur introuvable.');
        }

        const review = await Review.create({ userId, productId, rating, comment });

        return review;
    }

    static async getReviewsByProduct (productId) {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Produit introuvable.');
        }
    
        return await Review.findAll({ where: { productId } });
    };
}

module.exports = ReviewService;
