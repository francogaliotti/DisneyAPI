const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser')
const authController = require('../controllers/authController')

routes.post('/login', authController.login);

routes.post('/register', authController.register);

module.exports = routes