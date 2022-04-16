const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser')
const movieController = require('../controllers/movieController')
const auth = require('../middlewares/auth');


routes.get('/', movieController.getAllMovies)

routes.get('/:id', movieController.getMovieById)

routes.get('/tittle/:tittle', movieController.getMovieByTittle)

routes.get('/gender/:id', movieController.getMovieByGender)

routes.post('/', auth, movieController.upload, movieController.createMovie)

routes.put('/setCharacters/:id', auth, movieController.setCharacters)

routes.put('/:id', auth, movieController.upload, movieController.updateMovie)

routes.delete('/:id', auth, movieController.deleteMovie)

module.exports = routes