module.exports = (sequelize, type) => {
  const User = sequelize.define('user', {
    username:{
      type: type.STRING,
      allowNull : false,
      unique: true,
      validate: {
        len: {
          args : [4,255],
          msg: "The username must be at least 4 characters"
        }
      }
    },
    password:{
      type: type.STRING,
      allowNull : false,
    },
    email:{
      type: type.STRING,
      allowNull : false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Forbidden email"
        }
      }
    }
  },{
    timestamps: true
  })
  return User
}