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
            name: 'Test Product',
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
