/* eslint-disable camelcase */
// @ts-ignore
import client from '../database'

export interface addedProduct {
    id?: number,
    quantity: number,
    order_id: number,
    product_id: number
  }
export class ordersProductsStore {
  async index (): Promise<addedProduct[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders_products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not retrieve database rows. Error ${err}`)
    }
  }

  async showProduct (id: number): Promise<addedProduct> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders_products where id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not show order ${id}. Error ${err}`)
    }
  }

  async updateProduct (id: number, product: addedProduct): Promise<addedProduct> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql =
          'UPDATE orders_products SET (quantity, order_id, product_id) = ($2, (SELECT id FROM orders WHERE id=($3)), (SELECT id FROM products WHERE id=($4))) WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [
        id,
        product.quantity,
        product.order_id,
        product.product_id

      ])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update order ${id} ${product}. Error ${err}`)
    }
  }

  async addProduct (quantity : number, product_id : number, order_id : number) : Promise<addedProduct> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const ordersql = 'SELECT * FROM orders WHERE id=($1)'
      const result = await conn.query(ordersql, [order_id])
      conn.release()
      const order = result.rows[0]
      if (order.status !== 'active') {
        throw new Error(`Could not add Proudct ${product_id} to order ${order_id}. Order Status is not Active`)
      }
    } catch (err) {
      throw new Error(`${err}`)
    }
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'INSERT INTO orders_products (quantity, order_id, product_id) VALUES ($1, (SELECT id FROM orders WHERE id=($2)), (SELECT id FROM products WHERE id=($3))) RETURNING *'
      const result = await conn.query(sql, [quantity, order_id, product_id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not Add Product ${product_id}. Error ${err}`)
    }
  }

  async deleteProduct (id: number): Promise<addedProduct> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'DELETE FROM orders_products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error ${err}`)
    }
  }
}
