//let url = 'http://localhost:8080/users'
let url = "https://boiling-castle-22640.herokuapp.com/users"

function createUser(user){

    $.ajax({
        url: url, //url/endpointToAPI,
        method: "POST", 
        data: JSON.stringify(user),
        //crossDomain: true,
        ContentType: "application/json",
        dataType : "json",
        success : function(result){
            console.log("POST is a success");
            //window.location = "login.html";
        },
        error : function(err){
            console.log(err);
        }
    }); 
}

function clearFields(){
    $('#nombre').val("");
    $('#apellido').val("");
    $('#mail').val("");
    $('#password').val("");
    $('#passwordConfirm').val("");
    $('#checkBox').prop('checked',false);
}

function watchForm(){

    $('.sign-btn').on('click', function(e){
        e.preventDefault();
        let name = $('#nombre').val();
        let lastname = $('#apellido').val();
        let email = $('#mail').val();
        let password = $('#password').val();
        let passwordConfirm = $('#passwordConfirm').val();
        let userType;

        if(!(/@itesm.mx\s*$/.test(email) || /@tec.mx\s*$/.test(email))){
            alert("El correo debe ser un correo institucional (tec, itesm).");
        }
        else if(password !== passwordConfirm){
            alert("Las contraseñas no coinciden.");
        }
        else if(password.length < 8){
            alert("Contraseña debe ser de 8 o más caracteres.");
        }
        else if(name==="" || name === undefined || lastname ==="" || lastname=== undefined ){
            alert("Todos los campos deben ser llenados.");
        }
        else if(!$('#checkBox').prop('checked')){
            alert("Debe aceptar términos y condiciones.");
        }
        else{
            clearFields();

            name = name.replace(/^./,name[0].toUpperCase());
            lastname = lastname.replace(/^./,lastname[0].toUpperCase());
            email = email.toLowerCase();

            if(/@tec.mx\s*$/.test(email)){
                userType = "Professor"
            }
            else if(email[0]==='a'){
                userType = "Alumno"
            }

            user = {
                name,
                lastname,
                email,
                password,
                userType
            }
            //console.log(user);
            createUser(user);
        }

    });
}


function init(){
    watchForm();
}

init();
