import supertest from 'supertest'
import app from '../../server'
import jwt from 'jsonwebtoken'
import { user } from '../users'
import { order } from '../orders'

const request = supertest(app)

const u : user = {
  firstname: 'Mamdouh',
  lastname: 'Morad',
  password: 'meow'
}
const o : order = {
  id: 1,
  status: 'complete',
  user_id: 1
}
const token = jwt.sign(u, process.env.TOKEN_SECRET as string)

describe('Order Router Test Suite', () => {
  it('Should Return a New Order', async () => {
    const result = await request
      .post('/orders')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(o)

    expect(result.status).toBe(200)
  })

  it('Should Update an Order ', async () => {
    const result = await request
      .put('/orders/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 1,
        status: 'active',
        user_id: 1
      })

    expect(result.status).toBe(200)
    expect(result.body.id).toBe(1)
    expect(result.body.status).toBe('active')
    expect(result.body.user_id).toBe(1)
  })

  it('Should Retrieve an Existing Order', async () => {
    const result = await request
      .get('/orders/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(result.status).toBe(200)
    expect(result.body.id).toBe(1)
    expect(result.body.status).toBe('active')
    expect(result.body.user_id).toBe(1)
  })

  it('Should Retrieve All Existing Orders', async () => {
    const result = await request
      .get('/orders')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(result.body[1].id).toBe(1)
    expect(result.body[1].status).toBe('active')
    expect(result.body[1].user_id).toBe(1)
  })
})
