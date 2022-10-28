"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
/* eslint-disable jasmine/expect-matcher */
// eslint-disable-next-line no-unused-vars
const products_1 = require("../products");
const store = new products_1.productsStore();
describe('Product Model', () => {
    it('should have index method', () => {
        expect(store.index).toBeDefined;
    });
    it('should have show method', () => {
        expect(store.show).toBeDefined;
    });
    it('should have create method', () => {
        expect(store.create).toBeDefined;
    });
    it('should have update method', () => {
        expect(store.update).toBeDefined;
    });
    it('should have delete method', () => {
        expect(store.delete).toBeDefined;
    });
    it('Should Create new Product', async () => {
        const result = await store.create({
            name: 'Book',
            price: 5,
            category: 'educational'
        });
        // eslint-disable-next-line no-unused-vars
        const result2 = await store.create({
            name: 'TV',
            price: 50,
            category: 'electronic'
        });
        expect(result).toEqual({
            id: 1,
            name: 'Book',
            price: 5,
            category: 'educational'
        });
    });
    it('Should Retrieve all table entries', async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'Book',
                price: 5,
                category: 'educational'
            },
            {
                id: 2,
                name: 'TV',
                price: 50,
                category: 'electronic'
            }
        ]);
    });
    it('Should Retrieve entry with given index', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'Book',
            price: 5,
            category: 'educational'
        });
    });
    it('Should update Entry', async () => {
        const result = await store.update(1, { name: 'Pen', price: 1, category: 'office' });
        expect(result).toEqual({
            id: 1,
            name: 'Pen',
            price: 1,
            category: 'office'
        });
    });
    it('Should Delete Entry', async () => {
        await store.delete(2);
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'Pen',
                price: 1,
                category: 'office'
            }
        ]);
    });
});
