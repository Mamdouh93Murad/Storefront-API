import supertest from 'supertest'
import app from '../../server'
import jwt from 'jsonwebtoken'
import { user } from '../users'

const request = supertest(app)

const u : user = {
  firstname: 'Mamdouh',
  lastname: 'Morad',
  password: 'meow'
}
const token = jwt.sign(u, process.env.TOKEN_SECRET as string)

describe('User Router Test Suite', () => {
  it('Should Return a New User', async () => {
    const result = await request
      .post('/users')
      .set('Content-Type', 'application/json')
      .send(u)

    expect(result.status).toBe(200)
  })

  it('Should Update an Existing User', async () => {
    const result = await request
      .put('/users/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstname: 'Sherry',
        lastname: 'Morad',
        password: 'meow'
      })

    expect(result.status).toBe(200)
    expect(result.body.firstname).toBe('Sherry')
    expect(result.body.lastname).toBe('Morad')
  })

  it('Should Retrieve an Existing User', async () => {
    const result = await request
      .get('/users/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(result.status).toBe(200)
    expect(result.body.firstname).toBe('Sherry')
    expect(result.body.lastname).toBe('Morad')
  })

  it('Should Retrieve All Existing User', async () => {
    const result = await request
      .get('/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(result.status).toBe(200)
    expect(result.body[1].firstname).toBe('Sherry')
    expect(result.body[1].lastname).toBe('Morad')
  })
})
