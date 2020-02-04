
function watchForm(){
    $("#searchButton").on('click', function(e){
        e.preventDefault();
        var searchedStudent = $("#searchStudent").val();
        sessionStorage.setItem("searchedStudent", searchedStudent);
        console.log(searchedStudent);
        window.location = "Perfil.html";
    });
}

function init(){
    watchForm();
}

init();
//exports.student = searchedStudent;