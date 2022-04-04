const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser')
const genderController = require('../controllers/genderController')


routes.get('/', genderController.getAllGenders)

routes.post('/', genderController.createGender)

routes.delete('/:id', genderController.deleteGender)

module.exports = routes