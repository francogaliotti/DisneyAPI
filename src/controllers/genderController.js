const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { Gender } = require('../sequelize');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const getAllGenders = (req, res) => {
    Gender.findAll().then(genders => {
        res.send(genders)
    })
}

const createGender = (req, res) => {
    Gender.create({
        tittle: req.body.tittle
    }).then(gender => {
        res.send('gender created')
    })
}

const deleteGender = (req, res) => {
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
}

module.exports = {
    getAllGenders,
    createGender,
    deleteGender
}