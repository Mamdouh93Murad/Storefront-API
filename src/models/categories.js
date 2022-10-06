"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class categoryStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM categories';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Database Error ${err}`);
        }
    }
    async show(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM categories WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not Find Category ${id}, Error ${err}`);
        }
    }
    async create(c) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO categories (name) VALUES ($1)';
            const result = await conn.query(sql, [c.name]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not Add Category ${c}. Error ${err}`);
        }
    }
    async update(id, c) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'UPDATE categories SET name=($2) WHERE id=($1)';
            const result = await conn.query(sql, [id, c.name]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update Category ${c}. Error ${err}`);
        }
    }
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM categories WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not Delete Category ${id}. Error ${err}`);
        }
    }
}
exports.categoryStore = categoryStore;
