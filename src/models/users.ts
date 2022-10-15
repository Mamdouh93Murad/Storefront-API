// @ts-ignore
import client from '../database'
import bcrypt from 'bcrypt'
export interface user {
  id?: number
  name: string
  email: string,
  password : string
}

const {
  BCRYPT_PASSWORD,
  SALT_ROUNDS
} = process.env
export class usersStore {
  async index (): Promise<user[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not retrieve database rows. Error ${err}`)
    }
  }

  async show (id: number): Promise<user> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM users where id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not show user ${id}. Error ${err}`)
    }
  }

  async create (u: user): Promise<user> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'

      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        Number(SALT_ROUNDS)
      )

      const result = await conn.query(sql, [u.name, u.email, hash])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not create user ${u}. Error ${err}`)
    }
  }

  async update (id: number, u: user): Promise<user> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql =
        'UPDATE users SET (name, email, password) = ($2, $3, $4) WHERE id=($1) RETURNING *'

      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        Number(SALT_ROUNDS)
      )

      const result = await conn.query(sql, [id, u.name, u.email, hash])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update user ${id} ${u}. Error ${err}`)
    }
  }

  async delete (id: number): Promise<user> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'DELETE FROM users WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error ${err}`)
    }
  }

  async authenticate (username: string, password: string): Promise<user | null> {
    // @ts-ignore
    const conn = await client.connect()
    const sql = 'SELECT password FROM users WHERE name=($1)'

    const result = await conn.query(sql, [username])

    console.log(password + BCRYPT_PASSWORD)

    if (result.rows.length) {
      const user = result.rows[0]

      console.log(user)

      if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
        const sql = 'SELECT id, name, email FROM users where name=($1)'
        const newUser = await conn.query(sql, [username])
        return newUser.rows[0]
      }
    }

    return null
  }
}
