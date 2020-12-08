

require('dotenv').config();
const express = require('express');
const Animal = require('./model.js');
const app = express();
app.use(express.json());


app.post('/animals', async (req, res) => {
    Animal
        .insert(req.body)
        .then(animal => res.send(animal));
});


app.get('/animals', async (req, res) => {
    Animal
        .find()
        .then(animal => res.send(animal));

});

app.get('/animals/:id', async (req, res) => {
    Animal
        .findById(req.params.id)
        .then(animal => res.send(animal));

});

app.put('/animals/:id', async (req, res) => {
    Animal
        .update(req.params.id, req.body)
        .then(animal => res.send(animal));
});

app.delete('/animals/:id', async (req, res) => {
    Animal
        .delete(req.params.id)
        .then(animal => res.send(animal));
});

module.exports = app;
