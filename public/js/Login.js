let url = "http://localhost:8080/";

let user;
let password;


function login(userLogin){
    

    $.ajax({
        method: "POST", 
        url:(url+ "users/login"), //url/endpointToAPI
        contentType:"application/json",
        dataType: "json",
        data: JSON.stringify({userLogin}),
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

    $('.btn').on('click', function(e){
        e.preventDefault();
        user = $('#user').val();
        password = $('#password').val();
        userLogin ={
            user,
            password
        }
        login(userLogin);
    });
}


function init(){
    watchForm();
}

init();
