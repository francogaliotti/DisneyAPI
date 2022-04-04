const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser')
const movieController = require('../controllers/movieController')


routes.get('/', movieController.getAllMovies)

routes.get('/:id', movieController.getMovieById)

routes.get('/tittle/:tittle', movieController.getMovieByTittle)

routes.get('/gender/:id', movieController.getMovieByGender)

routes.post('/', movieController.createMovie)

routes.put('/setCharacters/:id', movieController.setCharacters)

routes.put('/:id', movieController.updateMovie)

routes.delete('/:id', movieController.deleteMovie)

module.exports = routes