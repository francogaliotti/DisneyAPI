const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { Gender } = require('../sequelize');
const multer = require('multer');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const getAllGenders = (req, res) => {
    Gender.findAll().then(genders => {
        res.send(genders)
    })
}

const createGender = (req, res) => {
    Gender.create({
        tittle: req.body.tittle,
        image: req.file.path
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

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images/genders')
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
    getAllGenders,
    createGender,
    deleteGender,
    upload
}