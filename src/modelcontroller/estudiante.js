let Estudiante = require('../models/estudiante')

//Traer a los Estudiantees
let getEstudiantes = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    Estudiante.find({}).then(function(estudiantes){
        res.send(estudiantes)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

//Traer un solo estudiante
let getEstudiante = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    let _id = req.params.id
    Estudiante.findById(_id).then(function(estudiante){
        if(!estudiante){
            return res.status(404).send()
        }
        return res.send(estudiante)
    }).catch(function(error){
        return res.status(500).send(error)
    })
}

/*
//Traer un solo estudiante por nombre
let getEstudiantebyName = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    let name = req.params.nombre;
    Estudiante.find({ nombre: name}).then(function(estudiante){
        if(!estudiante){
            return res.status(404).send()
        }
        return res.send(estudiante)
    }).catch(function(error){
        return res.status(500).send(error)
    })
}
*/

//Crear un Estudiante
let createEstudiante = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    let estudiante = new Estudiante(req.body)
    estudiante.save().then(function(){
        return res.send(estudiante)
    }).catch(function(error){
        return res.status(400).send(error)
    })
}

//Actualizar un Estudiante
let updateEstudiante = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    let _id = req.params.id
    
    let updates = Object.keys(req.body)
    let allowUpdates = ['nombre', 'apellido', 'carrera', 'matricula', 'participacion', 'interes', 'trabajoenequipo', 'respeto', 'asistencia', 'commentList']
    let isValidUpdate = updates.every((update) => allowUpdates.includes(update))
    console.log(isValidUpdate);
    if(!isValidUpdate){
        return res.status(400).send({
            error: 'Modificacion invalida, solo se puede modificar '+ allowUpdates
        })
    }
    Estudiante.findByIdAndUpdate(_id, req.body).then(function(estudiante){
        if(!estudiante){
            return res.status(404).send()
        }
        return res.send(estudiante)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

//Borrar un Estudiante
let deleteEstudiante = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    let _id = req.params.id
    Estudiante.findByIdAndDelete(_id).then(function(estudiante){
        if(!estudiante){
            return res.status(404).send()
        }
        return res.send(estudiante)
    }).catch(function(error){
        res.status(505).send(error)
    })
}

module.exports = {
    getEstudiantes: getEstudiantes,
    getEstudiante: getEstudiante,
    createEstudiante: createEstudiante,
    updateEstudiante: updateEstudiante,
    deleteEstudiante: deleteEstudiante
}