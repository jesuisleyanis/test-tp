const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app');
const sequelize = require('../config/db');
const Product = require('../models/productModel');
const { Invoice } = require('../models/invoiceModel');


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

    it('should retrieve all invoices', async () => {
        const res = await request.get('/invoices');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(1);
    });

    it('should retrieve an invoice by ID', async () => {
        const invoice = await Invoice.findOne(); // Récupérer une facture existante
        const res = await request.get(`/invoices/${invoice.id}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', invoice.id);
        expect(res.body.items).to.be.an('array');
        expect(res.body.items.length).to.be.greaterThan(0);
    });

    it('should update an invoice', async () => {
        const invoice = await Invoice.findOne();

        const res = await request.put(`/invoices/${invoice.id}`).send({
            products: [
                { productId: 1, quantity: 1 },
                { productId: 2, quantity: 2 },
            ],
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('invoice');
        expect(res.body.invoice.total).to.equal(50); // 1*10 + 2*20
    });
})