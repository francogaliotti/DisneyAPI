const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        res.status(400).json({
            error: "Not authorized"
        })
    } else {
        let token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                res.status(500).json({
                    error: "Internal server error"
                })
            } else {
                req.user = decoded
                next()
            }
        })
    }


}