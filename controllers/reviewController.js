const ReviewService = require('../services/reviewService');

exports.createReview = async (req, res) => {
    try {
        const { userId, productId, rating, comment } = req.body;
        const review = await ReviewService.createReview({ userId, productId, rating, comment });

        res.status(201).json({ message: 'Avis créé avec succès.', review });
    } catch (error) {
        if (error.message === 'Produit introuvable.') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Utilisateur introuvable.') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erreur serveur.', error: error.message }); 
    }
};

exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await ReviewService.getReviewsByProduct(productId);
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'Review introuvable.' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        if (error.message === 'Produit introuvable.') {
            return res.status(404).json({ message: error.message });
        }
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
        if (error.message === 'Avis introuvable.') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        const { userId, rating, comment } = req.body;
        
        const updatedReview = await ReviewService.updateReview(reviewId, { userId, rating, comment });
        
        res.status(200).json(updatedReview);
    } catch (error) {
        if (error.message === 'Avis introuvable') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Utilisateur introuvable') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Vous ne pouvez pas modifier cette review.') {
            return res.status(403).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        
        await ReviewService.deleteReview(reviewId);
        
        res.status(200).json({ message: 'Avis supprimé avec succès.' });
    } catch (error) {
        if (error.message === 'Review introuvable.') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};

