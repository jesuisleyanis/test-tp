const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app');
const sequelize = require('../config/db');

const { expect } = chai;
const request = supertest(app);

chai.use(chaiHttp);

describe('Review Routes', () => {
    let user, product, review;

    before(async () => {
        await sequelize.sync({ force: true }); 

        user = await request.post('/users').send({
            name: 'Test User',
            email: 'test.user@example.com'
        });

        product = await request.post('/products').send({
            libelle: 'Test Product',
            price: 10.99
        });
    });

    it('should create a new review', async () => {
        const res = await request.post('/reviews').send({
            userId: user.body.id,
            productId: product.body.id,
            rating: 5,
            comment: 'Excellent product!'
        });
        
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message');
        
        review = res.body;
    });

    it('should not create a review with an invalid product', async () => {
        const res = await request.post('/reviews').send({
            userId: user.body.id,
            productId: 9999,
            rating: 4
        });
        
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Produit introuvable.');
    });

    it('should not create a review with an invalid user', async () => {
        const res = await request.post('/reviews').send({
            userId: 123456789,
            productId: product.body.id,
            rating: 4
        });
        
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Utilisateur introuvable.');
    });

    it('should retrieve all reviews for a product', async () => {
        const res = await request.get(`/products/${product.body.id}/reviews`);
        
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
    });

    it('should failed to retrieve all reviews for a product with 404', async () => {
        const res = await request.get(`/products/20000/reviews`);
        
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Review introuvable.');
    });

    it('should retrieve a specific review by ID', async () => {
        const res = await request.get(`/reviews/${review.id}`);
        
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', review.id);
    });

    it('should failed to retrieve a specific review by ID with 404', async () => {
        const res = await request.get(`/reviews/121212`);
        
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('id', review.id);
    });

    it('should update a review', async () => {
        const res = await request.put(`/reviews/${review.id}`).send({
            rating: 4,
            comment: 'Updated review'
        });
        
        expect(res.status).to.equal(200);
        expect(res.body.rating).to.equal(4);
        expect(res.body.comment).to.equal('Updated review');
    });

    it('should failed to update a review with 404', async () => {
        
        const res = await request.put(`/reviews/4343`).send({
            userId: user.body.id,
            rating: 2
        });
        
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Utilisateur introuvable');
    });

    it('should not update a review of another user', async () => {
        const anotherUser = await request.post('/users').send({
            name: 'Another User',
            email: 'another.user@example.com'
        });
        
        const res = await request.put(`/reviews/${review.id}`).send({
            userId: anotherUser.body.id,
            rating: 2
        });
        
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Vous ne pouvez pas modifier cette review.');
    });

    it('should delete a review', async () => {
        const res = await request.delete(`/reviews/${review.id}`);
        
        expect(res.status).to.equal(200);
    });

    it('should failed to delete a review with 404', async () => {
        const res = await request.delete(`/reviews/42423`);
        
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Review introuvable.');
    });
});
