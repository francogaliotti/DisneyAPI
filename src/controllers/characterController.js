const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { Character, Movie } = require('../sequelize')
const multer = require('multer');
const path = require('path');

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
        movie.getCharacters().then(characters => {
            res.send(characters)
        })
    })
}

const createCharacter = (req, res) => {
    Character.create({
        name: req.body.name,
        image: req.file.path,
        age: req.body.age,
        weight: req.body.weight,
        history: req.body.history
    }).then(character => {
        res.send('character created')
    })
}

const updateCharacter = (req, res) => {
    let id = req.params.id
    let newCharacter = {
        name: req.body.name,
        image: req.file.path,
        age: req.body.age,
        weight: req.body.weight,
        history: req.body.history
    }
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

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images/characters')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }),
    limits: {
        fileSize: '5000000' 
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimType = fileTypes.test(file.mimetype)
        const extName = fileTypes.test(path.extname(file.originalname))
        console.log(extName , mimType)
        if(mimType && extName){
            return cb(null, true)
        } else {
            cb('Give proper files format to upload')
        }
    }
}).single('image')

module.exports = {
    getAllCharacters,
    getCharacterById,
    getCharacterByName,
    getCharactersByAge,
    getCharactersByMovie,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    upload
}