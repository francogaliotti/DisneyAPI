const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { Character, Movie } = require('../sequelize');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const getAllCharacters = (req, res) => {
    Character.findAll({
        include: Movie
    }).then(characters => {
        res.send(characters)
    })
}

const getCharacterById = (req, res) => {
    let id = req.params.id
    Character.findOne({
        where: {
            id: id
        },
        include: Movie
    }).then(character => {
        res.send(character)
    })
}

const getCharacterByName = (req, res) => {
    let name = req.params.name
    Character.findOne({
        where: {
            name: name
        },
        include: Movie
    }).then(character => {
        res.send(character)
    })
}

const getCharactersByAge = (req, res) => {
    let age = req.params.age
    Character.findAll({
        where: {
            age: age
        },
        include: Movie
    }).then(character => {
        res.send(character)
    })
}

const getCharactersByMovie = (req, res) => {
    let idMovie = req.params.idMovie
    Movie.findOne({
        where: {
            id: idMovie
        }
    }).then(movie => {
        movie.getCharacters().then(characters =>{
            res.send(characters)
        })
    })
}

const createCharacter = (req, res) => {
    Character.create({
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        history: req.body.history
    }).then(character => {
        res.send('character created')
    })
}

const updateCharacter = (req, res) => {
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
    }).catch(err => {
        res.status(400).json({
            error: 'bad data'
        })
    })
}

const deleteCharacter = (req, res) => {
    let id = req.params.id
    Character.findOne({
        where: {
            id: id
        }
    }).then(character => {
        character.destroy().then(character => {
            res.send('character deleted')
        })
    }).catch(err => {
        res.status(400).json({
            error: 'bad data'
        })
    })
}

module.exports = {
    getAllCharacters,
    getCharacterById,
    getCharacterByName,
    getCharactersByAge,
    getCharactersByMovie,
    createCharacter,
    updateCharacter,
    deleteCharacter
}