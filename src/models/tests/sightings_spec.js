"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sightings_1 = require("../sightings");
const store = new sightings_1.sightingsStore();
describe('Region Model', () => {
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
    it('Should Create new Category', async () => {
        const result = await store.create({
            name: 'Lion',
            description: 'King of Jungle',
            number: 2,
            user_id: 1,
            region_id: 1
        });
        expect(result).toEqual({
            id: 1,
            name: 'Lion',
            description: 'King of Jungle',
            number: 2,
            user_id: 1,
            region_id: 1
        });
    });
    it('Should Retrieve all table entries', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                name: 'Lion',
                description: 'King of Jungle',
                number: 2,
                user_id: 1,
                region_id: 1
            }]);
    });
    it('Should Retrieve entry with given index', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'Lion',
            description: 'King of Jungle',
            number: 2,
            user_id: 1,
            region_id: 1
        });
    });
    it('Should update Entry', async () => {
        const result = await store.update(1, {
            name: 'Tiger',
            description: 'King of Forest',
            number: 4,
            user_id: 2,
            region_id: 4
        });
        expect(result).toEqual({
            id: 1,
            name: 'Tiger',
            description: 'King of Forest',
            number: 4,
            user_id: 2,
            region_id: 4
        });
    });
    it('Should Delete Entry', async () => {
        await store.delete(1);
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
