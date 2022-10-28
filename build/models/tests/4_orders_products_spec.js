"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
/* eslint-disable jasmine/expect-matcher */
// eslint-disable-next-line no-unused-vars
const orders_products_1 = require("../orders_products");
const store = new orders_products_1.ordersProductsStore();
describe('Orders_Products Model', () => {
    it('should have index method', () => {
        expect(store.index).toBeDefined;
    });
    it('should have show method', () => {
        expect(store.showProduct).toBeDefined;
    });
    it('should have create method', () => {
        expect(store.addProduct).toBeDefined;
    });
    it('should have update method', () => {
        expect(store.updateProduct).toBeDefined;
    });
    it('should have delete method', () => {
        expect(store.deleteProduct).toBeDefined;
    });
    it('it Should Add Products to Order', async () => {
        const result = await store.addProduct(5, 1, 1);
        expect(result).toEqual({
            id: 1,
            quantity: 5,
            order_id: 1,
            product_id: 1
        });
    });
    it('Should Retrieve all table entries', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                quantity: 5,
                order_id: 1,
                product_id: 1
            }]);
    });
    it('Should Retrieve entry with given index', async () => {
        const result = await store.showProduct(1);
        expect(result).toEqual({
            id: 1,
            quantity: 5,
            order_id: 1,
            product_id: 1
        });
    });
    it('Should update Entry', async () => {
        const result = await store.updateProduct(1, {
            id: 1,
            quantity: 7,
            order_id: 1,
            product_id: 1
        });
        expect(result).toEqual({
            id: 1,
            quantity: 7,
            order_id: 1,
            product_id: 1
        });
    });
    it('Should Delete Entry', async () => {
        await store.deleteProduct(1);
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
