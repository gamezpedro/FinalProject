let url = "http://localhost:8080/";
//let url = "https://boiling-castle-22640.herokuapp.com/"
let results = $('.results');
let promedio;

function displayResults(responseJSON){
    console.log("Estamos dentro del Display Results");
    console.log(responseJSON);
    results.empty();

    for(let i = 0; i<responseJSON.length; i++){
    
        promedio = (responseJSON[i].participacion + responseJSON[i].interes + responseJSON[i].trabajoenequipo + responseJSON[i].respeto + responseJSON[i].asistencia)/5;
        results.append(`
            <tr>
                <td id="namelist" onclick="sendNombre('${responseJSON[i].nombre}')">
                     ${responseJSON[i].nombre}
                </td>
                <td>
                    ${promedio}
                </td>
            </tr>
        `);
    }
    console.log("These are the Results after append:")
    console.log(results);
}
    //window.location = "Perfil.html";
    //window.location = "Perfil.html";
    //location.replace("Perfil.html");

function sendNombre(student){
    console.log(student);
    sessionStorage.setItem("searchedStudent", student);
    window.location = "Perfil.html";
}

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
    $("#searchButton").on('click', function(e){
        e.preventDefault();
        var searchedStudent = $("#searchStudent").val();
        sessionStorage.setItem("searchedStudent", searchedStudent);
        //console.log(searchedStudent);
        window.location = "Perfil.html";
    });
}


function init(){
    fetchStudent();
    watchForm();

}

init();

