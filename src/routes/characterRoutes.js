const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser')
const { Character, Movie } = require('../sequelize');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes.get('/', (req, res) => {
    Character.findAll({
        include: Movie
    }).then(characters => {
        res.send(characters)
    })
})

routes.get('/:id', (req, res) => {
    let id = req.params.id
    Character.findOne({
        where: {
            id: id
        },
        include: Movie
    }).then(character => {
        res.send(character)
    })

})

routes.post('/', (req, res) => {
    Character.create({
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        history: req.body.history
    }).then(character => {
        res.send('character created')
    })
})

routes.put('/:id', (req, res) => {
    let id = req.params.id
    let newCharacter = req.body
    Character.findOne({
        where: {
            id: id
        }
    }).then(character => {
        character.update(newCharacter).then(character => {
            res.send('character updated')
        })
    })
})

routes.delete('/:id', (req, res) => {
    let id = req.params.id
    Character.findOne({
        where:{
            id: id
        }
    }).then(character =>{
        character.destroy().then(character =>{
            res.send('character deleted')
        })
    })
})

module.exports = routes