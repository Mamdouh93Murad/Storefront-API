// @ts-ignore
import client from "../database";

export interface sighting {
    id ?: number,
    name : string,
    description : string,
    number : number,
    user_id : number,
    region_id : number,
    category_id : number
}

export class sightingsStore {
    async index () : Promise<sighting[]> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM sightings'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }
        catch(err){
            throw new Error(`Could not retrieve database rows. Error ${err}`)
        }

    }

    async show(id : number) : Promise<sighting> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM sightings where id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Could not show sighting ${id}. Error ${err}`)
        }
    }

    async create(s : sighting, u : string, r : string, c : string) : Promise<sighting>{
        try{
            // @ts-ignore
            const conn = await client.connect()
            // const sql = 'INSERT INTO sightings (name, description, number, user_id, region_id) VALUES ($1, $2, $3, (SELECT id FROM users WHERE name=$(4)), (SELECT id FROM regions WHERE name=($5)), (SELECT id FROM categories WHERE name=($6)))'
            const sql = 'INSERT INTO sightings (name, description, number, user_id, region_id, category_id) VALUES ($1, $2, $3, (SELECT id FROM users WHERE name=($4)), (SELECT id FROM regions WHERE name=($5)), (SELECT id FROM categories WHERE name=($6))) RETURNING *'
            const result = await conn.query(sql, [s.name, s.description, s.number,  u, r, c])
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Could not create sighting ${s}. Error ${err}`)
        }
    }
    async update(id : number, s : sighting) : Promise<sighting>{
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'UPDATE sightings SET (name, description, number) = ($2, $3, $4) WHERE id=($1) RETURNING *'
            const result = await conn.query(sql, [id, s.name, s.description, s.number])
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Could not update sighting ${id} ${s}. Error ${err}`)
        }
    }


    async delete(id : number) : Promise<sighting>{
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'DELETE FROM sightings WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Could not delete user ${id}. Error ${err}`)
        }
    }

}