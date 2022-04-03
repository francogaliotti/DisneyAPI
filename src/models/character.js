module.exports = (sequelize, type) => {
  const Character = sequelize.define('character', {
    name:{
      type: type.STRING
    },
    age:{
      type: type.INTEGER
    },
    weight:{
      type: type.INTEGER
    },
    history: {
      type: type.STRING
    }
  },{
    timestamps: true
  })
  return Character
}