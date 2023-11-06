/*

function getCardUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}

function novoCard() {
    return getCardUid() ? false : true;
}

function encontraUid(uid) {
    showLoading();

    cardService.findByUid(uid)
        .then(card => {
            hideLoading();
            if (card) {
                preencherTelaCard(card);
                alternarBotãoSalvar();
            } else {
                alert("Documento nao encontrado");
                window.location.href = "../home/home.html";
            }
        })
        .catch(() => {
            hideLoading();
            alert("Erro ao recuperar documento");
            window.location.href = "../html/home.html";
        });
}




//alterar data
function mudarData() {
    const data = form.data().value;
    form.erronaData().textContent = !data ? "Campo obrigatório" : "";
    form.erronaData().style.display = !data ? "block" : "none";
    alternarBotãoSalvar();
}






function preencherTelaCard(card) {


    form.data().value = card.data;
    form.cardType().value = card.cardType;

    if (card.descricao) {
        form.descricao().value = card.descricao;
    }
}

function salvarCard() {
    const card = criarCard();

    if (novoCard()) {
        save(card);
    } else {
        atualizar(card);
    }
}

function save(card) {
    showLoading();

    cardService.save(card)
        .then(() => {
            hideLoading();
            window.location.href = "../html/home.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao salvar transaçao');
        })
}



function criarCard() {
    return {
        data: form.data().value,
        cardType: form.cardType().value,
        descricao: form.descricao().value,
        user: {
            uid: firebase.auth().currentUser.uid
        },
        uid: getCardUid()
    };
}




function alternarBotãoSalvar() {
    form.saveButton().disabled = !isFormValid();
}

function isFormValid() {
    const data = form.data().value;
    if (!data) {
        return false;
    }

    const value = form.value().value;
    if (!value || value <= 0) {
        return false;
    }

    const cardType = form.cardType().value;
    if (!cardType) {
        return false;
    }

    return true;
}





//objeto para acessar fácil o campo dos formulário 
const form = {  
    nomePersonalidade: () => document.getElementById('NomePersonalidade'),
     nomePersonalidade: () => document.getElementById('NomePersonalidade'),
    data: () => document.getElementById('dataNascimento'),
    erronaData: () => document.getElementById('erronaData'),
    descricao: () => document.getElementById('descricao'),
saveButton: () => document.getElementById('botaoSalvar'),

}





function formatdata(data) {
    return new data(data).toLocaledataString('pt-br');
}




form.nomeMaxErrror().style.display = password.length >= 6 ? "none" : "block";
// Verifica o campo Nome
if (nomePersonalidade.value.trim().split(/\s+/).length > ) {
  document.getElementById("nomeError").textContent = "O nome deve conter no máximo 15 palavras.";
} else {
  document.getElementById("nomeError").textContent = "";
}





firebase.auth().onAuthStateChanged(user => {
    if (user) {
        if (!novoCard()) {
            const uid = getCardUid();
            encontraUid(uid);
        }
    }
});


function alternarBotãoSalvar() {
    form.saveButton().disabled = !isFormValid();
}

function isFormValid() {
    const data = form.data().value;
    if (!data) {
        return false;
    }

    // Outras validações de campos

    return true;
}

// Restante do código..
