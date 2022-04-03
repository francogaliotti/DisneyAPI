const { Gender, Movie } = require("../sequelize")

module.exports = (sequelize, type) => {
    const Movie = sequelize.define('movie', {
      tittle:{
        type: type.STRING
      },
      creationDate:{
        type: type.DATE
      },
      rate:{
        type: type.INTEGER
      }
    },{
      timestamps: true
    })
    return Movie
  }