
//Impede usuários não logados de acessarem páginas
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "../../index.html";
    }
})