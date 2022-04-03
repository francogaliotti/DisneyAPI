const Sequelize = require('sequelize');
const CharacterModel = require('./models/character')
const MovieModel = require('./models/movie')
const DBURL = 'mysql://root:1234@localhost:3306/disneyapp'
const sequelize = new Sequelize(DBURL)
const Character = CharacterModel(sequelize,Sequelize)
const Movie = MovieModel(sequelize,Sequelize)

sequelize.sync().then(()=>{
    console.log("Tables created")
})

module.exports = {
    Character,
    Movie
}