const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser')
const characterController = require('../controllers/characterController')


routes.get('/', characterController.getAllCharacters)

routes.get('/:id', characterController.getCharacterById)

routes.get('/name/:name', characterController.getCharacterByName)

routes.get('/age/:age', characterController.getCharactersByAge)

routes.get('/movie/:idMovie', characterController.getCharactersByMovie)

routes.post('/', characterController.createCharacter)

routes.put('/:id', characterController.updateCharacter)

routes.delete('/:id', characterController.deleteCharacter)

module.exports = routes