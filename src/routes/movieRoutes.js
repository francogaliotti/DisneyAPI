const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser')
const { Movie, Gender, Character } = require('../sequelize');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes.get('/', (req, res) => {
    Movie.findAll({
        include: [Character, Gender]
    }).then(movies => {
        res.send(movies)
    })
})

routes.get('/:id', (req, res) => {
    let id = req.params.id
    Movie.findOne({
        where: {
            id: id
        },
        include: [Gender, Character]
    }).then(movies => {
        res.send(movies)
    })

})

routes.post('/', (req, res) => {
    Gender.findOne({
        where: {
            id: req.body.genderId
        }
    }).then(gender => {
        Movie.create({
            tittle: req.body.tittle,
            creationDate: req.body.creationDate,
            rate: req.body.rate
        }).then(movie => {
            res.send('movie created')
        })
    }).catch(err => {
        res.status(400).json({
            error: 'bad data'
        })
    })

})

routes.put('/setCharacters/:id', (req, res) => {
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
})

routes.put('/:id', (req, res) => {
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
})

routes.delete('/:id', (req, res) => {
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
})

module.exports = routes