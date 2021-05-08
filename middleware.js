const jwt = require('jsonwebtoken');
const config = require('./config');


exports.checkToken = (req, res, next) => {
    let token = req.headers["authorization"];
    token = token.slice(7, token.length);
    if (!!token)
        jwt.verify(token, config.key, (error, decoded) => {
            if (error) {
                return res.json({
                    status: false,
                    msg: 'Token is invalid'
                })
            } else {
                req.decoded = decoded
            }
        })
    else {
        return res.json({
                status: false,
                msg: 'Token is not provided'
        });
    }
}