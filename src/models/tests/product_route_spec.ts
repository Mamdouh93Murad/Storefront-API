import supertest from 'supertest'
import app from '../../server'
import jwt from 'jsonwebtoken'
import { user } from '../users'
import { product } from '../products'

const request = supertest(app)

const u : user = {
  firstname: 'Mamdouh',
  lastname: 'Morad',
  password: 'meow'
}
const p : product = {
  name: 'Pen',
  price: 5,
  category: 'office'
}
const token = jwt.sign(u, process.env.TOKEN_SECRET as string)

describe('Product Router Test Suite', () => {
  it('Should Return a New Product', async () => {
    const result = await request
      .post('/products')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(p)

    expect(result.status).toBe(200)
  })

  it('Should Update a Product ', async () => {
    const result = await request
      .put('/products/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'TV',
        price: 50,
        category: 'electronics'
      })

    expect(result.status).toBe(200)
    expect(result.body.name).toBe('TV')
    expect(result.body.price).toBe(50)
    expect(result.body.category).toBe('electronics')
  })

  it('Should Retrieve an Existing Product', async () => {
    const result = await request
      .get('/products/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(result.status).toBe(200)
    expect(result.body.name).toBe('TV')
    expect(result.body.price).toBe(50)
    expect(result.body.category).toBe('electronics')
  })

  it('Should Retrieve All Existing Product', async () => {
    const result = await request
      .get('/products')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(result.body[1].name).toBe('TV')
    expect(result.body[1].price).toBe(50)
    expect(result.body[1].category).toBe('electronics')
  })
})
