import { region, regionsStore } from "../regions";

const store = new regionsStore()

describe('Region Model', ()=> {
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
            name : 'Africa'
        })
        expect(result).toEqual({
            id : 1,
            name : 'Africa'
        })
    })
    it('Should Retrieve all table entries', async ()=> {
        const result = await store.index()
        expect(result).toEqual([{
            id: 1,
            name: 'Africa'
        }])
    })
    it('Should Retrieve entry with given index', async ()=> {
        const result = await store.show(1)
        expect(result).toEqual({
            id : 1,
            name : 'Africa'
        })
    })
    it('Should update Entry', async ()=> {
        const result = await store.update(1, {name:'Asia'})
        expect(result).toEqual({
            id : 1,
            name : 'Asia'
        })
    })
    it('Should Delete Entry', async ()=> {
        await store.delete(1)
        const result = await store.index()
        expect(result).toEqual([])
        
    })
})