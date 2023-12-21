import { auth } from "./firebase-config.js";
import { db } from "./firebase-config.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("comentarioForm");

    if (formulario) {
        formulario.addEventListener("submit", salvarComentario);
    }
});

async function salvarComentario(event) {
    event.preventDefault();

    const user = auth.currentUser;

    if (user) {
        const email = user.email || "";
        const assunto = document.getElementById("assunto").value;
        const comentario = document.getElementById("comment").value;

        if (assunto.trim() === "" || comentario.trim() === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        await salvarNoBanco(email, assunto, comentario);
    } else {
        console.error("Usuário não autenticado");
    }
}

async function salvarNoBanco(email, assunto, comentario) {
    const faleConoscoRef = collection(db, 'faleConosco');

    try {
        await addDoc(faleConoscoRef, {
            email: email,
            assunto: assunto,
            comentario: comentario,
        });

        console.log("Dados salvos com sucesso");
        alert("Comentário enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar no banco de dados:", error);
        alert("Erro ao enviar comentário. Por favor, tente novamente.");
    }
}
