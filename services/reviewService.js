const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

class ReviewService {
    static async createReview({ userId, productId, rating, comment }) {
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                throw new Error('Produit introuvable.');
            }

            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('Utilisateur introuvable.');
            }

            return await Review.create({ userId, productId, rating, comment });
        } catch (error) {
            throw error;
        }
    }

    static async getReviewsByProduct(productId) {
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                return null; // Évite un blocage si le produit n'existe pas
            }
            return await Review.findAll({ where: { productId } });
        } catch (error) {
            throw error;
        }
    }

    static async getReviewsById(reviewId) {
        try {
            return await Review.findByPk(reviewId) || null;
        } catch (error) {
            throw error;
        }
    }

    static async updateReview(reviewId, { userId, rating, comment }) {
        try {
            const review = await Review.findByPk(reviewId);
            if (!review) {
                throw new Error('Avis introuvable');
            }

            if (userId && review.userId !== userId) {
                throw new Error('Vous ne pouvez pas modifier cette review.');
            }

            // Mise à jour uniquement des champs fournis
            const updatedFields = {};
            if (rating !== undefined) updatedFields.rating = rating;
            if (comment !== undefined) updatedFields.comment = comment;

            await review.update(updatedFields);
            return review;
        } catch (error) {
            throw error;
        }
    }

    static async deleteReview(reviewId) {
        try {
            const review = await Review.findByPk(reviewId);
            if (!review) {
                return false; // Retourne `false` au lieu de lever une erreur
            }
            await review.destroy();
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ReviewService;
