const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app');
const sequelize = require('../config/db');
const Product = require('../models/productModel');


const { expect } = chai;
const request = supertest(app);

chai.use(chaiHttp);

describe('Invoice Routes', () => {
    before(async () => {
        await sequelize.sync({ force: true });
        await Product.bulkCreate([
            { id: 1, libelle: 'Product 1', price: 10 },
            { id: 2, libelle: 'Product 2', price: 20 },
        ]);
    });

    it('should create a new invoice', async () => {
        const res = await request.post('/invoices').send({
            products: [
                { productId: 1, quantity: 2 },
                { productId: 2, quantity: 1 },
            ],
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('invoice');
        expect(res.body).to.have.property('items');
        expect(res.body.invoice.total).to.equal(40); // 2*10 + 1*20
    });
})