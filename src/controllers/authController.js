const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { User } = require('../sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../config/auth');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const login = (req, res) => {
    let {username, password} = req.body;
    User.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if(bcrypt.compareSync(password, user.password)){
            let token = jwt.sign({ user: user }, auth.secret, {
                expiresIn: auth.expires
            });
            res.json({
                user: user,
                token: token
            })
        }else{
            res.status(401).json({
                error: "Incorrect password"
            })
        }
    }).catch(err => {
        res.status(400).json({
            error: "Username doesn't exist"
        })
    })
}

const register = (req, res) => {
    if (req.body.password.length >= 4) {
        let password = bcrypt.hashSync(req.body.password, auth.rounds)
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: password
        }).then(user => {
            let token = jwt.sign({ user: user }, auth.secret, {
                expiresIn: auth.expires
            });
            res.json({
                user: user,
                token: token
            })
        }).catch(err => {
            res.status(500).json(err)
        })
    }else{
        res.status(400).json({
            error: "The password must be at least 4 characters"
        })
    }

}

module.exports = {
    login,
    register
}