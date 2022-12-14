"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
/* eslint-disable jasmine/expect-matcher */
// eslint-disable-next-line no-unused-vars
const orders_1 = require("../orders");
const store = new orders_1.ordersStore();
describe('Order Model', () => {
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
    it('Should Create new order', async () => {
        // eslint-disable-next-line no-unused-vars
        const result = await store.create({
            id: 1,
            status: 'active',
            user_id: 1
        });
        const result2 = await store.create({
            id: 2,
            status: 'complete',
            user_id: 1
        });
        expect(result2).toEqual({
            id: 2,
            status: 'complete',
            user_id: 1
        });
    });
    it('Should Retrieve all table entries', async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                status: 'active',
                user_id: 1
            },
            {
                id: 2,
                status: 'complete',
                user_id: 1
            }
        ]);
    });
    it('Should Retrieve entry with given index', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: 1
        });
    });
    it('Should update Entry', async () => {
        const result = await store.update(2, {
            id: 2,
            status: 'active',
            user_id: 1
        });
        expect(result).toEqual({
            id: 2,
            status: 'active',
            user_id: 1
        });
    });
    it('Should Delete Entry', async () => {
        await store.delete(2);
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                status: 'active',
                user_id: 1
            }]);
    });
});
