"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(server_1.default);
const u = {
    firstname: 'Mamdouh',
    lastname: 'Morad',
    password: 'meow'
};
const p = {
    name: 'Pen',
    price: 5,
    category: 'office'
};
const token = jsonwebtoken_1.default.sign(u, process.env.TOKEN_SECRET);
describe('Product Router Test Suite', () => {
    it('Should Return a New Product', async () => {
        const result = await request
            .post('/products')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(p);
        expect(result.status).toBe(200);
    });
    it('Should Update a Product ', async () => {
        const result = await request
            .put('/products/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'TV',
            price: 50,
            category: 'electronics'
        });
        expect(result.status).toBe(200);
        expect(result.body.name).toBe('TV');
        expect(result.body.price).toBe(50);
        expect(result.body.category).toBe('electronics');
    });
    it('Should Retrieve an Existing Product', async () => {
        const result = await request
            .get('/products/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.name).toBe('TV');
        expect(result.body.price).toBe(50);
        expect(result.body.category).toBe('electronics');
    });
    it('Should Retrieve All Existing Product', async () => {
        const result = await request
            .get('/products')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(result.body[1].name).toBe('TV');
        expect(result.body[1].price).toBe(50);
        expect(result.body[1].category).toBe('electronics');
    });
});
