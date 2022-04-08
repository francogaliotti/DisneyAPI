module.exports = (sequelize, type) => {
    const Gender = sequelize.define('gender', {
      tittle:{
        type: type.STRING,
        allowNull : false,
        unique: true
      },
      image:{
        type: type.STRING
      }
    },{
      timestamps: true
    })
    return Gender
  }