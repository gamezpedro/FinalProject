let url = "http://localhost:8080/estudiantes"
//let url = "https://boiling-castle-22640.herokuapp.com/estudiantes"
function agregarEstudiante(){
    let nombre = $('#input1').val()+(" ")+$('#input2').val();
    let carrera = $('#input3').val();
    let respetoValue = $("input[name='respetoStar']:checked").val();
    let participacionValue = $("input[name='participacionStar']:checked").val();
    let asistenciaValue = $("input[name='asistenciaStar']:checked").val();
    let interesValue = $("input[name='interesStar']:checked").val();
    let trabajoValue = $("input[name='trabajoStar']:checked").val();
    let comment = $("#commentsBox").val();

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
    
    $.ajax({
        method: "POST", 
        url:(url), //url/endpointToAPI
        contentType:"application/json",
        dataType: "json",
        data: JSON.stringify({estudianteNuevo}),
        success : function(result){
            console.log("Funcionó el post")
        },
        error: function(e){
            console.log(e);
        },
    }); 
}

function watchForm(){
    $("#searchButton").on('click', function(e){
        e.preventDefault();
        var searchedStudent = $("#searchStudent").val();
        sessionStorage.setItem("searchedStudent", searchedStudent);
        //console.log(searchedStudent);
        window.location = "Perfil.html";
    });

    $("#agregarBtn").on('click', function(e){
        e.preventDefault();
        agregarEstudiante();
    });

}

function init(){
    watchForm();
}

init();
