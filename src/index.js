const express = require('express');
const mysql = require('mysql');
const app = express();
const characterRoutes = require('./routes/characterRoutes')
const {Sequelize} = require('./sequelize')

//settings
app.set('port', process.env.PORT || 8080);

//middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('Welcome to my API')
})
app.use('/api/characters', characterRoutes);

//start server
app.listen(app.get('port'),() => {
    console.log("Server on port", app.get('port'))
})