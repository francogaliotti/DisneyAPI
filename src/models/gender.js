module.exports = (sequelize, type) => {
    const Gender = sequelize.define('gender', {
      tittle:{
        type: type.STRING
      }
    },{
      timestamps: true
    })
    return Gender
  }