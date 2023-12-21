import { auth } from "./firebase-config.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { db } from "./firebase-config.js";
import { doc, setDoc,getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
document.addEventListener("DOMContentLoaded", function () {
    

    const loginButton = document.getElementById('login');
    if (loginButton) {
        loginButton.addEventListener('click', login);
    }

    const signupButton = document.getElementById('signup');
    if (signupButton) {
        signupButton.addEventListener('click', signup);
    }

    const toggleFormsButton = document.querySelector('#toggleForms');
    if (toggleFormsButton) {
        toggleFormsButton.addEventListener('click', toggleForms);
    }

    const clearButton = document.querySelector(".clear");
    if (clearButton) {
        clearButton.addEventListener("click", signOutUser);
    }
});

async function login() {
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    var errorMessage = document.getElementById('errorMessage');

    try {
        // Realiza a autenticação
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const tipoUsuario = userDocSnap.data().tipoUsuario;

            if (tipoUsuario === 'admin') {
                window.location.href = "assest/html/admin-home.html";
            } else {
                window.location.href = "assest/html/home.html";
            }
        } else {
            console.error('Documento do usuário não encontrado no Firestore');
        }
    } catch (error) {
        alert('Erro: ' + error.message);
    }
}

async function signup() {
    var name = document.getElementById('signupName').value;
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var errorMessage = document.getElementById('errorMessage');

    if (password !== confirmPassword) {
        errorMessage.innerHTML = 'As senhas não correspondem';
        return;
    }

    try {
       
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

     
        await setDoc(doc(db, 'users', user.uid), {
            tipoUsuario: 'comum', 
            email: email,
            nome: name,  
        
        });

        alert('Usuário criado e logado');
        
   
        window.location.href = "assest/html/home.html";
    } catch (error) {
        alert(mensagemDeErro(error));
    }
}

function mensagemDeErro(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    } else if (error.code == "auth/weak-password") {
        return "A senha não pode ter menos que 6 caracteres";
    } else if (error.code == "auth/invalid-email") {
        return "Tipo de email inválido";
    }

    return error.message;
}




function toggleForms() {
    var loginForm = document.getElementById('loginForm');
    var signupForm = document.getElementById('signupForm');
    var errorMessage = document.getElementById('errorMessage');

    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
    errorMessage.innerHTML = '';
}

function signOutUser() {
    signOut(auth)
        .then(() => {
            window.location.href = "../../index.html";
        })
        .catch(() => {
            alert('Erro ao fazer logout');
        });
}





/* Guardiao
function checkAuthState() {
    onAuthStateChanged(auth, user => {
        if (user) {
            window.location.href = "../../index.html";
        }
    });
}
*/