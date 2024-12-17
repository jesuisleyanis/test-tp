const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app'); // Import the app
const sequelize = require('../config/db'); // Import the database

const { expect } = chai;
const request = supertest(app);

chai.use(chaiHttp);

describe('Product Routes', () => {
    // Before running tests, sync the database
    before(async () => {
        await sequelize.sync({ force: true }); // Reset the database
    });

    it('should create a new product', async () => {
        const res = await request.post('/products').send({
            libelle: 'John Doe',
            price: 10,
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.libelle).to.equal('John Doe');
        expect(res.body.price).to.equal(10);
    });

    it('should retrieve all products', async () => {
        const res = await request.get('/products');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(1); // Should have one product
    });

    it('should retrieve a product by ID', async () => {
        const product = await request.post('/products').send({
            libelle: 'Jane Doe',
            price: 'jane.doe@example.com',
        });

        const res = await request.get(`/products/${product.body.id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', product.body.id);
        expect(res.body.libelle).to.equal('Jane Doe');
    });

    it('should update a product', async () => {
        const product = await request.post('/products').send({
            libelle: 'Alice',
            price: 'alice@example.com',
        });

        const res = await request.put(`/products/${product.body.id}`).send({
            libelle: 'Alice Updated',
        });

        expect(res.status).to.equal(200);
        expect(res.body.libelle).to.equal('Alice Updated');
    });

    it('should delete a product', async () => {
        const product = await request.post('/products').send({
            libelle: 'Bob',
            price: 'bob@example.com',
        });

        const res = await request.delete(`/products/${product.body.id}`);
        expect(res.status).to.equal(204);

        const findRes = await request.get(`/products/${product.body.id}`);
        expect(findRes.status).to.equal(404);
    });
});
