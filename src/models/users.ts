// @ts-ignore
import client from '../database'

export interface user {
  id?: number
  name: string
  email: string
}

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
      const sql = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *'
      const result = await conn.query(sql, [u.name, u.email])
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
        'UPDATE users SET (name, email) = ($2, $3) WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id, u.name, u.email])
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
}
