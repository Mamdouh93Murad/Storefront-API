"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sightingsStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class sightingsStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM sightings';
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
            const sql = 'SELECT * FROM sightings where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not show sighting ${id}. Error ${err}`);
        }
    }
    async create(s, u, r, c) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            // const sql = 'INSERT INTO sightings (name, description, number, user_id, region_id) VALUES ($1, $2, $3, (SELECT id FROM users WHERE name=$(4)), (SELECT id FROM regions WHERE name=($5)), (SELECT id FROM categories WHERE name=($6)))'
            const sql = 'INSERT INTO sightings (name, description, number, user_id, region_id, category_id) VALUES ($1, $2, $3, (SELECT id FROM users WHERE name=($4)), (SELECT id FROM regions WHERE name=($5)), (SELECT id FROM categories WHERE name=($6))) RETURNING *';
            const result = await conn.query(sql, [s.name, s.description, s.number, u, r, c]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create sighting ${s}. Error ${err}`);
        }
    }
    async update(id, s) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'UPDATE sightings SET (name, description, number) = ($2, $3, $4) WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id, s.name, s.description, s.number]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update sighting ${id} ${s}. Error ${err}`);
        }
    }
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM sightings WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error ${err}`);
        }
    }
}
exports.sightingsStore = sightingsStore;
