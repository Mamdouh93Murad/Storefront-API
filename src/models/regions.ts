// @ts-ignore
import client from '../database'

export interface region {
  id?: number
  name: string
}

export class regionsStore {
  async index (): Promise<region[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM regions'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not retrieve database rows. Error ${err}`)
    }
  }

  async show (id: number): Promise<region> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM regions WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not show user ${id}. Error ${err}`)
    }
  }

  async create (r: region): Promise<region> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'INSERT INTO regions (name) VALUES ($1) RETURNING *'
      const result = await conn.query(sql, [r.name])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not create user ${r}. Error ${err}`)
    }
  }

  async update (id: number, r: region): Promise<region> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'UPDATE regions SET name=($2) WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id, r.name])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update user ${id} ${r}. Error ${err}`)
    }
  }

  async delete (id: number): Promise<region> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'DELETE FROM regions WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error ${err}`)
    }
  }
}
