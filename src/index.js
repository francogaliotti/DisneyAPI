const express = require('express');
const mysql = require('mysql');
const app = express();
const characterRoutes = require('./routes/characterRoutes')
const movieRoutes = require('./routes/movieRoutes')
const genderRoutes = require('./routes/genderRoutes')
const authRoutes = require('./routes/authRoutes')

//settings
app.set('port', process.env.PORT || 8080);

//middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('Welcome to my API')
})
app.use('/api/characters', characterRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/genders',genderRoutes);
app.use('/api/auth', authRoutes);

//static images folder
app.use('../images', express.static('../images'))

//start server
app.listen(app.get('port'),() => {
    console.log("Server on port", app.get('port'))
})