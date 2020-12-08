
const pool = require('./lib/utils/pool.js')


module.exports = class Animal {
    id;
    type;
    name;
    cuteness;

    constructor(row) {
        this.id = row.id;
        this.type = row.type;
        this.name = row.name;
        this.cuteness = row.cuteness;
    }

    static async insert({ type, name, cuteness }) {
        const { rows } = await pool.query(
            'INSERT INTO animals (type, name, cuteness) VALUES ($1, $2, $3) RETURNING *',
            [type, name, cuteness]
        );
        return new Animal(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM animals');
        return rows.map(row => new Animal(row));
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM animals WHERE id=$1', [id]);
        if (!rows[0]) throw new Error(`No animal with id ${id}`);
        return new Animal(rows[0]);
    }

    static async update(id, { type, name, cuteness }) {
        const { rows } = await pool.query('UPDATE animals SET type=$1, name=$2, cuteness=$3 WHERE id = $4 RETURNING *', [type, name, cuteness, id]);
        return new Animal(rows[0]);
    }
    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM animals WHERE id=$1 RETURNING *', [id]
        );
        return new Animal(rows[0]);
    }
};
