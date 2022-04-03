const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser')
const { Gender } = require('../sequelize');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes.get('/', (req, res) => {
    Gender.findAll().then(genders => {
        res.send(genders)
    })
})

routes.post('/', (req, res) => {
    Gender.create({
        tittle: req.body.tittle
    }).then(gender => {
        res.send('gender created')
    })
})

routes.delete('/:id', (req, res) => {
    let id = req.params.id
    Gender.findOne({
        where:{
            id: id
        }
    }).then(movie =>{
        movie.destroy().then(gender =>{
            res.send('gender deleted')
        })
    })
})

module.exports = routes