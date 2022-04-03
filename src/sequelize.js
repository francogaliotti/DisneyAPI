const Sequelize = require('sequelize');
const CharacterModel = require('./models/character')
const MovieModel = require('./models/movie')
const GenderModel = require('./models/gender')
const DBURL = 'mysql://root:1234@localhost:3306/disneyapp'
const sequelize = new Sequelize(DBURL)
const Character = CharacterModel(sequelize,Sequelize)
const Movie = MovieModel(sequelize,Sequelize)
const Gender = GenderModel(sequelize,Sequelize)

//Relations
Movie.belongsTo(Gender);
Gender.hasMany(Movie);
Character.belongsToMany(Movie,{
    through: 'CharacterMovie'
});
Movie.belongsToMany(Character,{
    through : 'CharacterMovie'
})

sequelize.sync().then(()=>{
    console.log("Tables created")
})

module.exports = {
    Character,
    Movie,
    Gender
}