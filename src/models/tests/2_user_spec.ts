/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
/* eslint-disable jasmine/expect-matcher */
// eslint-disable-next-line no-unused-vars
import { user, usersStore } from '../users'

const store = new usersStore()

describe('User Model', () => {
  it('should have index method', () => {
    expect(store.index).toBeDefined
  })

  it('should have show method', () => {
    expect(store.show).toBeDefined
  })

  it('should have create method', () => {
    expect(store.create).toBeDefined
  })

  it('should have update method', () => {
    expect(store.update).toBeDefined
  })

  it('should have delete method', () => {
    expect(store.delete).toBeDefined
  })

  it('Should Create new User', async () => {
    const result = await store.create({
      firstname: 'Mamdouh',
      lastname: 'Morad',
      password: 'meow'
    })
    // eslint-disable-next-line no-unused-vars
    const result2 = await store.create({
      firstname: 'Sanji',
      lastname: 'Morad',
      password: 'meow'
    })

    expect(result.id).toBe(
      1)

    expect(result.firstname).toBe(
      'Mamdouh')

    expect(result.lastname).toBe(
      'Morad')
  })

  it('Should Retrieve all table entries', async () => {
    const result = await store.index()

    expect(result[0].id).toBe(
      1)

    expect(result[0].firstname).toBe(
      'Mamdouh')

    expect(result[0].lastname).toBe(
      'Morad')

    expect(result[1].id).toBe(
      2)

    expect(result[1].firstname).toBe(
      'Sanji')

    expect(result[1].lastname).toBe(
      'Morad')
  })

  it('Should Retrieve entry with given index', async () => {
    const result = await store.show(1)

    expect(result.id).toBe(
      1)

    expect(result.firstname).toBe(
      'Mamdouh')

    expect(result.lastname).toBe(
      'Morad')
  })

  it('Should update Entry', async () => {
    const result = await store.update(2, {
      firstname: 'Sherry',
      lastname: 'Morad',
      password: 'meow'
    })

    expect(result.id).toBe(
      2)

    expect(result.firstname).toBe(
      'Sherry')

    expect(result.lastname).toBe(
      'Morad')
  })

  it('Should Delete Entry', async () => {
    await store.delete(2)
    const result = await store.index()

    expect(result[0].id).toBe(
      1)

    expect(result[0].firstname).toBe(
      'Mamdouh')

    expect(result[0].lastname).toBe(
      'Morad')
  })
})
