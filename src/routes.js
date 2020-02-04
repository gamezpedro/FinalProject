let express = require('express')
let router = express.Router()

let Estudiante = require('./modelcontroller/estudiante')
let users = require('./modelcontroller/user')
let authenticate = require('./middleware/authenticate')

//Rutas para controlador usuario
router.get('/users/:id', authenticate, users.getUser)
router.get('/users', authenticate, users.getUsers)
router.post('/users/login', users.login)
router.post('/users/logout', users.logout)
router.post('/users', users.createUser)
router.put('/users/:id', users.updateUser)
router.delete('/users/:id', users.deleteUser)

//Rutas para controlador de Estudiantes
router.get('/consultar/estudiantes', Estudiante.getEstudiantes)
router.get('/consultar/estudiantes/:id', Estudiante.getEstudiante)
//router.get('/consultar/estudiantespornombre/:name', Estudiante.getEstudiantebyName)
router.post('/estudiantes', Estudiante.createEstudiante)
router.put('/editar/estudiantes/:id', Estudiante.updateEstudiante)
router.delete('/editar/estudiantes/:id', Estudiante.deleteEstudiante)


router.get('*', function(req, res) {
    res.send({
      error: 'Esta ruta no existe'
    })
})

module.exports = router