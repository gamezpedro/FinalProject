
var searchedStudent = sessionStorage.getItem("searchedStudent");
let nombre;
let carrera;
let respetoValue;
let participacionValue;
let asistenciaValue;
let interesValue;
let trabajoValue;
let comment;


function

function updateValues(responseJSON){
    for(let i = 0; i<responseJSON.length; i++){
        if(responseJSON[i].nombre === searchedStudent){
            let size = responseJSON[i].commenList.length;
            let respeto = ((responseJSON[i].respeto * size)+respetoValue)/(size+1);
            let interes = ((responseJSON[i].interes * size)+interesValue)/(size+1);
            let participacion = ((responseJSON[i].participacion * size)+participacionValue)/(size+1);
            let asistencia = ((responseJSON[i].asistencia * size)+asistenciaValue)/(size+1);
            let trabajo = ((responseJSON[i].trabajoenequipo * size)+trabajoValue)/(size+1);
        }
    }
    updateStudents();
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
        getStudent();

    });


    estudianteNuevo = {
        nombre,
        carrera,
        participacionValue,
        interesValue,
        trabajoValue,
        respetoValue,
        asistenciaValue,
        comment
    }
}


function init(){
    display();
    watchForm();
}

init();
