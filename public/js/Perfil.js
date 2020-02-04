
let url = "http://localhost:8080/";
//let url = "https://boiling-castle-22640.herokuapp.com/";


var searchedStudent = sessionStorage.getItem("searchedStudent");
console.log("estamos en el perfil este es el estudiante buscado:");
console.log(searchedStudent);

let nombre = $('#nombre');
let carrera = $('#carrera');
let results = $('.results');
let comentarios = $('#comentarios');
let appendValue;

function displayResults(responseJSON){
    //console.log("Estamos dentro del Display Results");
    //console.log(responseJSON);
    //console.log(searchedStudent);
    results.empty();
    nombre.empty();
    carrera.empty();
    comentarios.empty();

    for(let i = 0; i < responseJSON.length; i++){
        if(responseJSON[i].nombre == searchedStudent){
            promedio = (responseJSON[i].participacion + responseJSON[i].interes + responseJSON[i].trabajoenequipo + responseJSON[i].respeto + responseJSON[i].asistencia)/5;
            appendValue =(`
            <tr>
                <td class="grande">
                    ${promedio}%
                </td>
                <td>
                    ${responseJSON[i].participacion}%
                </td>
                <td>
                    ${responseJSON[i].interes}%
                </td>
                <td>
                    ${responseJSON[i].trabajoenequipo}%
                </td>
                <td>
                    ${responseJSON[i].respeto}%
                </td>
                <td>
                    ${responseJSON[i].asistencia}%
                </td>
            </tr>
            `);
            nombre.append(`${responseJSON[i].nombre}`);
            carrera.append(`${responseJSON[i].carrera}`);
            results.append(appendValue);
            for(let j=0; j < responseJSON[i].commentList.length; j++){
                comentarios.append(`
                    <p>${responseJSON[i].commentList[j]}</p>
                `);
            }
        }
    }
}
    //window.location = "Perfil.html";
    //window.location = "Perfil.html";
    //location.replace("Perfil.html");

function fetchStudent(){

    $.ajax({
      url : (url + 'consultar/estudiantes'),
      method : "GET",
      dataType : "json",
      success : function( responseJSON ){
        displayResults( responseJSON );
      },
      error : function( err ){
        console.log( err );
      }
    });
}

function watchForm(){
    $('#calificar').on('click', function(e){
    e.preventDefault();
    windows.location = "Calificar.html";
    });
    $("#searchButton").on('click', function(e){
        e.preventDefault();
        var searchedStudent = $("#searchStudent").val();
        sessionStorage.setItem("searchedStudent", searchedStudent);
        console.log(searchedStudent);
        window.location = "Perfil.html";
    });
}

function init(){
    fetchStudent();
    watchForm();
}

init();