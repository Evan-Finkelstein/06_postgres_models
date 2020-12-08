const fs = require('fs');
const request = require('supertest');
const app = require('./index');
const Animal = require('./model');
const pool = require('./lib/utils/pool');


describe('app tests', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./setup.sql', 'utf-8'));
    })
    afterAll(() => {
        return pool.end();
    });

    it('create an animal', async () => {
        const response = await request(app)
            .post('/animals')
            .send({
                type: 'rock',
                name: 'gary',
                cuteness: '10'
            });
        expect(response.body).toEqual({
            id: '1',
            type: 'rock',
            name: 'gary',
            cuteness: '10'
        })
    })

    it('finds an animal by id', async () => {
        const animal = await Animal.insert({
            type: 'rock',
            name: 'gary',
            cuteness: '10'
        });
        const response = await request(app)
            .get(`/animals/${animal.id}`);
        expect(response.body).toEqual(animal);

    })
    it('finds all animals', async () => {
        const animal = await Animal.insert({
            type: 'rock',
            name: 'gary',
            cuteness: '10'
        });
        const response = await request(app)
            .get('/animals');
        expect(response.body).toEqual([animal]);

    })

    it('updates an animal', async () => {
        const animal = await Animal.insert({
            type: 'rock',
            name: 'gary',
            cuteness: '10'
        });
        const response = await request(app)
            .put(`/animals/${animal.id}`)
            .send({
                type: 'tree',
                name: 'bill',
                cuteness: '9'
            })
        expect(response.body).toEqual({
            type: 'tree',
            id: animal.id,
            name: 'bill',
            cuteness: '9'
        })



    });


    it('deletes an animal', async () => {
        const animal = await Animal.insert({
            type: 'rock',
            name: 'gary',
            cutenss: '10'
        })
        const response = await request(app)
            .delete(`/animals/${animal.id}`);
        expect(response.body).toEqual(animal);
    });
});



