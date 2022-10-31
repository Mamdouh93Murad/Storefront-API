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
    quantity: 1,
    order_id: 2,
    product_id: 3
};
const token = jsonwebtoken_1.default.sign(u, process.env.TOKEN_SECRET);
xdescribe('Order_Products Router Test Suite', () => {
    it('Should Return a Order Product', async () => {
        const result = await request
            .post('/orders/1/products')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(a);
        expect(result.status).toBe(200);
    });
});
