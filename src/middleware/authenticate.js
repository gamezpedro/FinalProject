let jwt = require('jsonwebtoken')
let User = require('../models/user')
let config = require('../config')

//Autorizacion
let authenticate = function( req, res, next ) {
  try {
    let token = req.header('Authorization').replace('Bearer ', '')
    let decoded = jwt.verify(token, config.secret)
    User.findOne({ _id: decoded._id, 'tokens.token': token }).then(function(user) {
      if(!user) {
        throw new Error()
      }
      req.token = token
      req.user = user
      next()
    }).catch(function(error) {
      res.status(401).send({ error: 'Autenticate'})
    })
  } catch(e) {
    res.status(401).send({ error: 'Autenticate'})
  }
}

module.exports = authenticate