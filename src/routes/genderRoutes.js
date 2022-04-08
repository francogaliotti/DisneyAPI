const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser')
const genderController = require('../controllers/genderController')
const auth = require('../middlewares/auth');


routes.get('/', genderController.getAllGenders)

routes.post('/', auth, genderController.upload, genderController.createGender)

routes.delete('/:id', auth, genderController.deleteGender)

module.exports = routes