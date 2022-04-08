const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser')
const characterController = require('../controllers/characterController');
const auth = require('../middlewares/auth');



routes.get('/', characterController.getAllCharacters)

routes.get('/:id', characterController.getCharacterById)

routes.get('/name/:name', characterController.getCharacterByName)

routes.get('/age/:age', characterController.getCharactersByAge)

routes.get('/movie/:idMovie', characterController.getCharactersByMovie)

routes.post('/', auth, characterController.upload, characterController.createCharacter)

routes.put('/:id', auth, characterController.updateCharacter)

routes.delete('/:id', auth, characterController.deleteCharacter)

module.exports = routes