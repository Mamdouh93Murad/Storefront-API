"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class usersStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
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
            console.log(id);
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not show user ${id}. Error ${err}`);
        }
    }
    async create(u) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [u.name, u.email]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create user ${u}. Error ${err}`);
        }
    }
    async update(id, u) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'UPDATE users SET (name, email) = ($2, $3) WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id, u.name, u.email]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update user ${id} ${u}. Error ${err}`);
        }
    }
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error ${err}`);
        }
    }
}
exports.usersStore = usersStore;
