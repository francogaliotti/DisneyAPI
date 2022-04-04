const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { Movie, Gender, Character } = require('../sequelize');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const getAllMovies = (req, res) => {
    Movie.findAll({
        include: [Character, Gender]
    }).then(movies => {
        res.send(movies)
    })
}

const getMovieById = (req, res) => {
    let id = req.params.id
    Movie.findOne({
        where: {
            id: id
        },
        include: [Gender, Character]
    }).then(movies => {
        res.send(movies)
    })
}

const getMovieByTittle = (req, res) => {
    let tittle = req.params.tittle
    Movie.findOne({
        where: {
            tittle: tittle
        },
        include: [Gender, Character]
    }).then(movies => {
        res.send(movies)
    })
}

const getMovieByGender = (req, res) => {
    Gender.findOne({
        where: {
            id: req.params.id
        }
    }).then(gender => {
        Movie.findAll({
            where: {
                genderId: gender.id
            }
        }).then(movies => {
            res.send(movies)
        })
    }).catch(err => {
        res.status(400).json({
            error: 'bad data'
        })
    })
}

const createMovie = (req, res) => {
    Gender.findOne({
        where: {
            id: req.body.genderId
        }
    }).then(gender => {
        Movie.create({
            tittle: req.body.tittle,
            creationDate: req.body.creationDate,
            rate: req.body.rate,
            genderId: gender.id
        }).then(movie => {
            res.send('movie created')
        })
    }).catch(err => {
        res.status(400).json({
            error: 'bad data'
        })
    })
}

const setCharacters = (req, res) => {
    Character.findOne({
        where: {
            id: req.body.id
        }
    }).then(character => Movie.findOne({
        where: {
            id: req.params.id
        }
    }).then(movie => {
        movie.setCharacters([character])
        res.send('movie updated')

    })
    )
    Movie.findOne({
        where: {
            id: req.params.id
        }
    }).then(movie => {
        movie.setCharacters([character])
        res.send('movie updated')

    })
}

const updateMovie = (req, res) => {
    let id = req.params.id
    let newMovie = req.body
    Movie.findOne({
        where: {
            id: id
        }
    }).then(movie => {
        movie.update(newMovie).then(movie => {
            res.send('movie updated')
        })
    })
}

const deleteMovie = (req, res) => {
    let id = req.params.id
    Movie.findOne({
        where: {
            id: id
        }
    }).then(movie => {
        movie.destroy().then(movie => {
            res.send('movie deleted')
        })
    })
}

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    setCharacters,
    deleteMovie,
    getMovieByGender,
    getMovieByTittle
}