import supertest from 'supertest'
import app from '../../server'
import jwt from 'jsonwebtoken'
import { user } from '../users'
import { addedProduct } from '../orders_products'

const request = supertest(app)

const u : user = {
  firstname: 'Mamdouh',
  lastname: 'Morad',
  password: 'meow'
}
const a : addedProduct = {
  quantity: 5,
  order_id: 1,
  product_id: 1
}
const token = jwt.sign(u, process.env.TOKEN_SECRET as string)

describe('Order Product Router Test Suite', () => {
  it('Should Return a New Order Product', async () => {
    const result = await request
      .post('/orders/1/products')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(a)
    console.log(result.body)
    expect(result.status).toBe(200)
  })

  it('Should Update an Order Product ', async () => {
    const result = await request
      .put('/orders/1/products/2')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        quantity: 7,
        order_id: 1,
        product_id: 1
      })

    expect(result.status).toBe(200)
    expect(result.body.quantity).toBe(7)
    expect(result.body.order_id).toBe(1)
    expect(result.body.product_id).toBe(1)
  })

  it('Should Retrieve an Existing Order Product', async () => {
    const result = await request
      .get('/orders/1/products/2')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(result.status).toBe(200)
    expect(result.body.quantity).toBe(7)
    expect(result.body.order_id).toBe(1)
    expect(result.body.product_id).toBe(1)
  })

  it('Should Retrieve All Existing Order Product', async () => {
    const result = await request
      .get('/orders/1/products/2')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(result.body.quantity).toBe(7)
    expect(result.body.order_id).toBe(1)
    expect(result.body.product_id).toBe(1)
  })

  it('Should Delete An Existing Order Product', async () => {
    const res = await request
      .delete('/orders/1/products/2')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    const result = await request
      .get('/orders/1/products/2')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(result.status).toBe(200)
    expect(result.body.length).toBe(0)
  })
})
