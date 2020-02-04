
var searchedStudent = sessionStorage.getItem("searchedStudent");
let nombre;
let carrera;
let respetoValue;
let participacionValue;
let asistenciaValue;
let interesValue;
let trabajoValue;
let comment;

function updateStudents(estudianteActualizado, id){
    $.ajax({
		type : 'PUT',
		url : ("http://localhost:8080/editar/estudiante/"+ id),
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify({estudianteActualizado}),
		success: function(data){

			console.log("Correct Update")
		},
		error:function(error){
			console.log("error")
		}
	});
}


function display(nombre, carrera){
    $('#nombre').append(nombre);
    $('#carrera').append(carrera);
}

function updateValues(responseJSON){
    let id;
    for(let i = 0; i<responseJSON.length; i++){
        if(responseJSON[i].nombre === searchedStudent){
            let name = responseJSON[i].nombre;
            let career = responseJSON[i].carrera;
            let size = responseJSON[i].commentList.length;
            let respeto = ((responseJSON[i].respeto * size)+respetoValue)/(size+1);
            let interes = ((responseJSON[i].interes * size)+interesValue)/(size+1);
            let participacion = ((responseJSON[i].participacion * size)+participacionValue)/(size+1);
            let asistencia = ((responseJSON[i].asistencia * size)+asistenciaValue)/(size+1);
            let trabajo = ((responseJSON[i].trabajoenequipo * size)+trabajoValue)/(size+1);
            let comments = (responseJSON[i].commentList.push(comment));
            id = responseJSON[i].id;
        }
    }
    
    estudianteActualizado = {
        name,
        career,
        participacion,
        interes,
        trabajo,
        respeto,
        asistencia,
        comments
    }
    updateStudents(estudianteActualizado, id);
}

function getStudent(){
    $.ajax({
        url : (url + 'consultar/estudiantes'),
        method : "GET",
        dataType : "json",
        success : function( responseJSON ){
          updateValues( responseJSON );
        },
        error : function( err ){
          console.log( err );
        }
      });
}


function watchForm(){
    $("#agregarBtn").on('click', function(e){
        e.preventDefault();
        nombre = $('#input1').val()+(" ")+$('#input2').val();
        carrera = $('#input3').val();
        respetoValue = $("input[name='respetoStar']:checked").val();
        participacionValue = $("input[name='participacionStar']:checked").val();
        asistenciaValue = $("input[name='asistenciaStar']:checked").val();
        interesValue = $("input[name='interesStar']:checked").val();
        trabajoValue = $("input[name='trabajoStar']:checked").val();
        comment = $("#commentsBox").val();
        display(nombre, carrera);
        getStudent();

    });
}


function init(){
    watchForm();
}

init();
