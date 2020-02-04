let mongoose = require('mongoose');
let validator = require('validator');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let config = require('../config');

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email invalido, Especifique Correo Institucional')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  },
  userType: {
      type: String,
      required: true,
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.statics.findByCredentials = function(email, password) {
  return new Promise( function(resolve, reject) {
    User.findOne({ email }).then(function(user) {
      if( !user ) {
        return reject('El Usuario no existe')
      }
      bcrypt.compare(password, user.password).then(function(match) {
        if(match) {
          return resolve(user)
        } else {
          return reject('Contraseña o usuario incorrecto')
        }
      }).catch( function(error) {
        return reject('Contraseña o usuario incorrecto')
      })
    })
  })
}

userSchema.methods.generateToken = function() {
  let user = this
  let token = jwt.sign({ _id: user._id.toString() }, config.secret, { expiresIn: '7 days'})
  user.tokens = user.tokens.concat({ token })
  console.log(token);
  return new Promise(function( resolve, reject) {
    user.save().then(function(user){
      return resolve(token)
    }).catch(function(error) {
      return reject(error)
    })
  })
}

userSchema.pre('save', function(next) {
  let user = this
  if( user.isModified('password') ) {
    bcrypt.hash(user.password, 8).then(function(hash){
      user.password = hash
      next()
    }).catch(function(error){
      return next(error)
    })
  } else {
    next()  
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
