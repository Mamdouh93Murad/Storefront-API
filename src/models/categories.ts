// @ts-ignore
import client from '../database'

export interface category {
  id?: number
  name: string
}

export class categoryStore {
  async index (): Promise<category[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM categories'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Database Error ${err}`)
    }
  }

  async show (id: number): Promise<category> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM categories WHERE id=($1)'
      const result = await conn.query(sql, [id])
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not Find Category ${id}, Error ${err}`)
    }
  }

  async create (c: category): Promise<category> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'INSERT INTO categories (name) VALUES ($1) RETURNING *'
      const result = await conn.query(sql, [c.name])
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not Add Category ${c}. Error ${err}`)
    }
  }

  async update (id: number, c: category): Promise<category> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'UPDATE categories SET name=($2) WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id, c.name])
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update Category ${c}. Error ${err}`)
    }
  }

  async delete (id: number): Promise<category> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'DELETE FROM categories WHERE id=($1)'
      const result = await conn.query(sql, [id])
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not Delete Category ${id}. Error ${err}`)
    }
  }
}
