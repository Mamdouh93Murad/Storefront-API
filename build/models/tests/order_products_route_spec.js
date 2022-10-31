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
const a = {
    quantity: 5,
    order_id: 1,
    product_id: 1
};
const token = jsonwebtoken_1.default.sign(u, process.env.TOKEN_SECRET);
describe('Order Product Router Test Suite', () => {
    it('Should Return a New Order', async () => {
        const result = await request
            .post('/orders/1/products')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(a);
        console.log(result.body);
        expect(result.status).toBe(200);
    });
    it('Should Update an Order Product ', async () => {
        const result = await request
            .put('/orders/2/products')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
            quantity: 7,
            order_id: 1,
            product_id: 1
        });
        expect(result.status).toBe(200);
        expect(result.body.quantity).toBe(7);
        expect(result.body.order_id).toBe(1);
        expect(result.body.product_id).toBe(1);
    });
    it('Should Retrieve an Existing Order Product', async () => {
        const result = await request
            .get('/orders/2/products')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.quantity).toBe(7);
        expect(result.body.order_id).toBe(1);
        expect(result.body.product_id).toBe(1);
    });
    it('Should Retrieve All Existing Order Product', async () => {
        const result = await request
            .get('/orders/2/products')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(result.body.quantity).toBe(7);
        expect(result.body.order_id).toBe(1);
        expect(result.body.product_id).toBe(1);
    });
    it('Should Delete An Existing Order Product', async () => {
        const res = await request
            .delete('/orders/2/products')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        const result = await request
            .get('/orders/2/products')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.length).toBe(0);
    });
});
