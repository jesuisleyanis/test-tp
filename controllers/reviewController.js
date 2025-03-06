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
