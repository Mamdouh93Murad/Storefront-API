"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersStore = void 0;
/* eslint-disable camelcase */
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class ordersStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not retrieve database rows. Error ${err}`);
        }
    }
    async show(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not show order ${id}. Error ${err}`);
        }
    }
    async create(order) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, (SELECT id FROM users WHERE id=($2))) RETURNING *';
            const result = await conn.query(sql, [
                order.status,
                order.user_id
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create order ${order}. Error ${err}`);
        }
    }
    async update(id, order) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'UPDATE orders SET (status, user_id) = ($2, (SELECT id FROM users WHERE id=($3))) WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [
                id,
                order.status,
                order.user_id
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update order ${id} ${order}. Error ${err}`);
        }
    }
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            await conn.query('DELETE FROM orders_products WHERE id=($1)', [id]);
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error ${err}`);
        }
    }
}
exports.ordersStore = ordersStore;
