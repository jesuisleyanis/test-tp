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

    static async getReviewsById (reviewId) {
        try {
            const review = await Review.findByPk(reviewId);
            return review;
        } catch (error) {
            throw new Error('Avis introuvable.');
        }
    };

    static async updateReview (reviewId, { userId, rating, comment }) {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            throw new Error('Avis introuvable');
        }
                
        if (userId) {            
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('Utilisateur introuvable');
            }
                        
            if (review.userId !== userId) {
                throw new Error('Vous ne pouvez pas modifier cette review.');
            }
        }
                
        if (rating !== undefined) {
            review.rating = rating;
        }
        
        if (comment !== undefined) {
            review.comment = comment;
        }
                
        await review.save();
        
        return review;
    };

    static async deleteReview (reviewId) {

        const review = await Review.findByPk(reviewId);
        if (!review) {
            throw new Error('Review introuvable.');
        }
        
        await review.destroy();
        
        return true;
    };
}

module.exports = ReviewService;
