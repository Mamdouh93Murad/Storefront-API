import { category, categoryStore } from "../categories";

const store = new categoryStore()

describe('Category Model', ()=> {
    it('should have index method', ()=> {
        expect(store.index).toBeDefined
    })
    it('should have show method', ()=> {
        expect(store.show).toBeDefined
    })
    it('should have create method', ()=> {
        expect(store.create).toBeDefined
    })
    it('should have update method', ()=> {
        expect(store.update).toBeDefined
    })
    it('should have delete method', ()=> {
        expect(store.delete).toBeDefined
    })

    it('Should Create new Category', async ()=> {
        const result = await store.create({
            name : 'Plant'
        })
        const result2 = await store.create({
            name : 'Animal'
        })
        expect(result).toEqual({
            id : 1,
            name : 'Plant'
        })
    })
    it('Should Retrieve all table entries', async ()=> {
        const result = await store.index()
        expect(result).toEqual([{
            id: 1,
            name: 'Plant'
        }, {
            id : 2,
            name : 'Animal'
        }])
    })
    it('Should Retrieve entry with given index', async ()=> {
        const result = await store.show(1)
        expect(result).toEqual({
            id : 1,
            name : 'Plant'
        })
    })
    it('Should update Entry', async ()=> {
        const result = await store.update(1, {name:'Bird'})
        expect(result).toEqual({
            id : 1,
            name : 'Bird'
        })
    })
    it('Should Delete Entry', async ()=> {
        await store.delete(1)
        const result = await store.index()
        expect(result).toEqual([{
            id : 2,
            name : 'Animal'
        }])
        
    })
})