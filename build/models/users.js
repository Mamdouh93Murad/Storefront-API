"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
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
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, Number(SALT_ROUNDS));
            const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
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
            const sql = 'UPDATE users SET (firstname, lastname, password) = ($2, $3, $4) WHERE id=($1) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, Number(SALT_ROUNDS));
            const result = await conn.query(sql, [id, u.firstname, u.lastname, hash]);
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
    async authenticate(username, password) {
        // @ts-ignore
        const conn = await database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE firstname=($1)';
        const result = await conn.query(sql, [username]);
        console.log(password + BCRYPT_PASSWORD);
        if (result.rows.length) {
            const user = result.rows[0];
            console.log(user);
            if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                const sql = 'SELECT id, firstname, lastname FROM users where firstname=($1)';
                const newUser = await conn.query(sql, [username]);
                return newUser.rows[0];
            }
        }
        return null;
    }
}
exports.usersStore = usersStore;
