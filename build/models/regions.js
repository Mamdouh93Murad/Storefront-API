"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionsStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class regionsStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM regions';
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
            const sql = 'SELECT * FROM regions WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not show user ${id}. Error ${err}`);
        }
    }
    async create(r) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO regions (name) VALUES ($1) RETURNING *';
            const result = await conn.query(sql, [r.name]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create user ${r}. Error ${err}`);
        }
    }
    async update(id, r) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'UPDATE regions SET name=($2) WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id, r.name]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update user ${id} ${r}. Error ${err}`);
        }
    }
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM regions WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error ${err}`);
        }
    }
}
exports.regionsStore = regionsStore;
