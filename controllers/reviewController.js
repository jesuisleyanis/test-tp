const ReviewService = require('../services/reviewService');

exports.createReview = async (req, res) => {
    try {
        const { userId, productId, rating, comment } = req.body;
        const review = await ReviewService.createReview({ userId, productId, rating, comment });
        res.status(201).json({ message: 'Avis créé avec succès.', review });
    } catch (error) {
        res.status(error.message.includes('introuvable') ? 404 : 500).json({ message: error.message });
    }
};

exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await ReviewService.getReviewsByProduct(productId);

        if (!reviews) {
            return res.status(404).json({ message: 'Produit introuvable.' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};

exports.getReviewsById = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await ReviewService.getReviewsById(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Avis introuvable.' });
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { userId, rating, comment } = req.body;
        const updatedReview = await ReviewService.updateReview(reviewId, { userId, rating, comment });

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(error.message.includes('introuvable') ? 404 : error.message.includes('modifier cette review') ? 403 : 500)
            .json({ message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const deleted = await ReviewService.deleteReview(reviewId);

        if (!deleted) {
            return res.status(404).json({ message: 'Avis introuvable.' });
        }

        res.status(200).json({ message: 'Avis supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};
