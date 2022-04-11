const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { User } = require('../sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../config/auth');
require('dotenv').config()
const sgMail = require ('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const sendMail = async (msg) =>{
    try {
        await sgMail.send(msg)
        console.log("Message sent successfully")
    } catch (err){
        console.log(err)
        if (err.response){
            console.error(err.response.body)
        }
    }
}

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
            sendMail({
                to:user.email,
                from:"francogaliotti@gmail.com",
                subject:"Welcome",
                text:"Welcome to the Disney API! Your username is: "+user.username
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