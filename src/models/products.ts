// @ts-ignore
import client from '../database'

export interface product {
  id?: number
  name: string,
  price : number,
  category: string
}

export class productsStore {
  async index (): Promise<product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not retrieve database rows. Error ${err}`)
    }
  }

  async show (id: number): Promise<product> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not show product ${id}. Error ${err}`)
    }
  }

  async create (p: product): Promise<product> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [p.name, p.price, p.category])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not create product ${p}. Error ${err}`)
    }
  }

  async update (id: number, p: product): Promise<product> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'UPDATE products SET (name, price, category) = ($2, $3, $4) WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id, p.name, p.price, p.category])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update product ${id} ${p}. Error ${err}`)
    }
  }

  async delete (id: number): Promise<product> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'DELETE FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error ${err}`)
    }
  }
}
