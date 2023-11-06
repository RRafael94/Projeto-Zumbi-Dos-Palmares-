


document.addEventListener("DOMContentLoaded", function () {
	var formCadastro = document.getElementById('form-cadastro');
	if (formCadastro) {
		formCadastro.addEventListener('submit', function (event) {
			event.preventDefault();
			var email = document.getElementById("email-cadastro").value;
			var senha = document.getElementById("senha").value;
			//crio um usuário com email e senha  
			firebase.auth().createUserWithEmailAndPassword(email, senha).then(user => {
				alert('Usuario criado e logado');
				window.location.href = "../html/home.html";

			}).catch(err => {
				alert(mensagemDeErro(err));

			});
		});
	}

	var formLogin = document.getElementById('form-login');
	if (formLogin) {
		formLogin.addEventListener('submit', function (event) {
			event.preventDefault();
			var email = document.getElementById('usuario').value;
			var senha = document.getElementById('senha').value;
			//faço login e autentico  o usuario com email e senha  
			firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {
				alert('Usuário  logado');
				window.location.href = "assest/html/home.html";
				
			}).catch(err => {

				alert(err);

			});
		});
	}
});

function mensagemDeErro(error) {
	if (error.code == "auth/email-already-in-use") {
		return "Email já está em uso";
	} return error.message

} 


//manter usuario logado 


/*


// listener de dom ready
document.addEventListener("DOMContentLoaded",function(){

});


/função para cadadstro com email e senha
 /*
document.getElementById('form-cadastro').addEventListener('submit', function(event) {
	event.preventDefault(); // Evita que o formulário seja submetido
     
	var email = document.getElementById("email").value;
	var senha = document.getElementById("senha").value;
	//crio um usuário com email e senha  
	firebase.auth().createUserWithEmailAndPassword(email,senha).then(user =>{
		cosole.log('usario',user) 
		alert('Usuario criado e logado'); 
		window.location.href ="assest/html/login.html";
	}).catch(err =>{
	console.log('error',err);
 
	}); 
}) 
*/

/*

document.getElementById('form-login').addEventListener('submit', function(event) {
	 // Evita que o formulário seja submetido

	
	var email = document.getElementById('usuario').value;
	var senha = document.getElementById('senha').value;
	//faço login e autentico  o usuario com email e senha  
	firebase.auth().signInWithEmailAndPassword(email,senha).then(() =>{
		alert('Usuário  logado');
		window.location.href ="assest/html/home.html";
	}).catch(err =>{
		
		alert(err);
 
	});
});

*/
/*

function validarCampos(){
    const emailValid = isEmailValid();
    document.getElementById("botao-recuperar").disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;

}
function isEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}


function isPasswordValid() {
    const password = document.getElementById("senha").value;
    if (!password) {
        return false;
    }
    return true;
}


function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}




*/