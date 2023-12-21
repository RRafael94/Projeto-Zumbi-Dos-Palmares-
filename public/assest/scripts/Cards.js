import { auth } from "./firebase-config.js";
import { db } from "./firebase-config.js";

import { doc, collection, addDoc, getDocs, getDoc, updateDoc, setDoc, deleteDoc, query, where, arrayUnion, arrayRemove} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

let currentUser;



document.addEventListener("DOMContentLoaded", function () {
    let botaoAdicionarBio = document.getElementById("adicionarBio");
    let biografiaForm = document.getElementById("biografiaForm");





    if (botaoAdicionarBio) {
        botaoAdicionarBio.addEventListener('click', function (event) {
            event.preventDefault(); 
            adicionarBio();
        });
    }

    if (biografiaForm) {
        biografiaForm.addEventListener('submit', function (event) {
            event.preventDefault(); 
            adicionarBio();
        });
    }


    let NomePersonalidade = document.getElementById("NomePersonalidade");

    let descricao = document.getElementById("descricao");
    let adicionarlinkimg = document.getElementById("adicionarlinkimg");
    let excluir = document.getElementById("deletarCard");



    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    //  ouvinte de evento ao botão de pesquisa
    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm !== "") {
            buscarDadosNoBanco(searchTerm);
        }
    });

    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('Usuário autenticado:', user.uid);
            currentUser = user.uid;

            // Buscar  e exiber os favoritos apenas quando o usuário estiver autenticado
            buscarFavoritos();
        } else {
            
            console.log('Nenhum usuário autenticado.');
            currentUser = null;
        }
    });


    async function adicionarBio() {
        const NomePersonalidade = document.getElementById("NomePersonalidade");
        const descricao = document.getElementById("descricao");
        const adicionarlinkimg = document.getElementById("adicionarlinkimg");

        const ref = collection(db, 'Cards');

        try {
            const docRef = await addDoc(ref, {
                NomePersonalidade: NomePersonalidade.value,
                descricao: descricao.value,
                adicionarlinkimg: adicionarlinkimg.value,
            });

        
            alert("Incluído com sucesso");
        } catch (error) {
            console.error("Erro de inclusão:", error);
            alert("Erro de inclusão");
        }
    }






    buscarDadosNoBanco();



    buscarFavoritos();


    
    async function buscarDadosNoBanco(searchTerm = "") {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = ""; 
    
        const cardsCollection = collection(db, 'Cards');
        const querySnapshot = await getDocs(cardsCollection);
    
        let encontrouResultados = false;
    
        querySnapshot.forEach(doc => {
            const cardData = doc.data();
            cardData.id = doc.id;
    
            // Verifica se o termo de pesquisa está presente nos dados do card
            if (cardData.NomePersonalidade.toLowerCase().includes(searchTerm) ||
                cardData.descricao.toLowerCase().includes(searchTerm)) {
                encontrouResultados = true;
                criarCard(cardData);
            }
        });
    
        if (!encontrouResultados) {
            alert("Nenhum resultado encontrado.");
            location.reload(); 
        }
    }



    
    function criarCard(cardData) {

        const cardsContainer = document.getElementById('cards-container');
        const novoCard = document.createElement('div');
        novoCard.className = 'container';
        const imgContainer = document.createElement('div');
        imgContainer.className = 'img-container';
        const img = document.createElement('img');
        img.src = cardData.adicionarlinkimg;
        const details = document.createElement('div');
        details.className = 'details';
        const h2 = document.createElement('h2');
        h2.textContent = cardData.NomePersonalidade;

        const p = document.createElement('p');
        p.textContent = cardData.descricao;
        const iconesCard = document.createElement('div');
        iconesCard.className = 'container-icon';

        let imgRemover;
        usuarioEhAdministrador().then(isAdmin => {
            if (isAdmin) {
                imgRemover = document.createElement('img');
                imgRemover.src = "../images/imgiconeremover.png";
                imgRemover.alt = "Ícone";
                imgRemover.className = "icones";
                imgRemover.addEventListener("click", () => deletarCard(cardData.id));
                iconesCard.appendChild(imgRemover);
            }

            const imgFavoritar = document.createElement('img');
            imgFavoritar.src = "../images/icons_estrela.png";
            imgFavoritar.alt = "Ícone";
            imgFavoritar.className = "icones";
            imgFavoritar.addEventListener("click", () => adicionarFavorito(cardData.id));

            cardsContainer.appendChild(novoCard);
            novoCard.appendChild(imgContainer);
            imgContainer.appendChild(img);
            novoCard.appendChild(details);
            details.appendChild(h2);
            details.appendChild(p);
            novoCard.appendChild(iconesCard);



            if (isAdmin) {
                iconesCard.appendChild(imgRemover);
            }

            iconesCard.appendChild(imgFavoritar);
        });
    }

    async function usuarioEhAdministrador() {
        const user = auth.currentUser;

        if (!user) {
            console.error('Nenhum usuário autenticado.');
            return false;
        }

        const userDocRef = doc(db, 'users', user.uid);

        try {
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists() && docSnap.data().tipoUsuario === 'admin') {
                console.log('Usuário é um administrador');
                return true;
            } else {
                console.log('Usuário não é um administrador');
                return false;
            }
        } catch (error) {
            console.error('Erro ao verificar tipo de usuário:', error);
            return false;
        }
    }


});



//adiciona CampoFavorito no banco 
async function adicionarCampoFavorito() {
    const ref = collection(db, 'Cards');
    const snapshot = await getDocs(ref);

    snapshot.forEach(async (documento) => {
        const cardRef = doc(db, 'Cards', documento.id)
        await updateDoc(cardRef, { favorito: false });


    });


}
adicionarCampoFavorito();


// buscar dados dos favoritos no banco de dados
async function buscarFavoritos() {
    if (!currentUser) {
        console.error('Nenhum usuário autenticado.');
        return;
    }

    const favoritosCollectionRef = collection(db, 'Favoritos');
    const favoritosDocRef = doc(favoritosCollectionRef, currentUser);

    try {
        const docSnap = await getDoc(favoritosDocRef);
        if (docSnap.exists()) {
            const favoritosIds = docSnap.data().favoritos || [];
            favoritosIds.forEach(async (cardId) => {
                const ref = doc(db, 'Cards', cardId);
                const cardDocSnap = await getDoc(ref);

                if (cardDocSnap.exists()) {
                    const cardData = cardDocSnap.data();
                    cardData.id = cardDocSnap.id;
                    criarCardFavorito(cardData);
                }
            });
        }
    } catch (error) {
        console.error('Erro ao obter dados de favoritos do Firestore:', error);
    }
}



function criarCardFavorito(cardData) {


    const favoritosContainer = document.getElementById('favoritos');

    const novoCard = document.createElement('div');
    novoCard.className = 'container favorito';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    const img = document.createElement('img');
    img.src = cardData.adicionarlinkimg;

    const details = document.createElement('div');
    details.className = 'details';

    const h2 = document.createElement('h2');
    h2.textContent = cardData.NomePersonalidade;

    const p = document.createElement('p');
    p.textContent = cardData.descricao;

    const iconesCard = document.createElement('div');
    iconesCard.className = 'container-icon';

    const imgRemover = document.createElement('img');
    imgRemover.src = "../images/imgiconeremover.png";
    imgRemover.alt = "Ícone";
    imgRemover.className = "icones";
    imgRemover.addEventListener("click", () => removerCardFavorito(cardData.id));

   

    novoCard.appendChild(imgContainer);
    imgContainer.appendChild(img);
    novoCard.appendChild(details);
    details.appendChild(h2);
    details.appendChild(p);
    novoCard.appendChild(iconesCard);
    iconesCard.appendChild(imgRemover);
    favoritosContainer.appendChild(novoCard);


}

async function adicionarFavorito(cardId) {
    if (!currentUser) {
        console.error('Nenhum usuário autenticado.');
        return;
    }

    const ref = doc(db, 'Cards', cardId);
    const docSnap = await getDoc(ref);

    if (!docSnap.exists()) {
        alert("O card não existe");
        return;
    }

    // Define o campo "favorito" como true no card
    await updateDoc(ref, {
        favorito: true,
    });


    const favoritosCollectionRef = collection(db, 'Favoritos');
    const favoritosDocRef = doc(favoritosCollectionRef, currentUser);

    const favoritosDocSnap = await getDoc(favoritosDocRef);
    if (favoritosDocSnap.exists()) {
        await updateDoc(favoritosDocRef, {
            favoritos: arrayUnion(cardId),
        });
    } else {
        await setDoc(favoritosDocRef, {
            favoritos: [cardId],
        });
    }

    console.log("Adicionado aos favoritos com sucesso");
}



async function deletarCard(cardId) {
    const ref = doc(db, 'Cards', cardId);
    const docSnap = await getDoc(ref);

    if (!docSnap.exists()) {
        alert("O card não existe");
        return;
    }

    await removerFavorito(cardId);

    const favoritedByQuery = query(collection(db, 'favoritos'), where('cards', 'array-contains', cardId));
    const favoritedBySnapshot = await getDocs(favoritedByQuery);

    favoritedBySnapshot.forEach(async (doc) => {
        const userId = doc.id;

        // Atualiza a coleção de favoritos do usuário removendo apenas o card
        await updateDoc(doc(db, 'favoritos', userId), {
            cards: arrayRemove(cardId),
        });
    });

    // Deleta o card do Firestore após atualizar as coleções de favoritos
    await deleteDoc(ref)
        .then(() => {
            console.log("Card excluído com sucesso");
        })
        .catch((error) => {
            console.log("Erro na exclusão do card", error);
        });
}




async function removerCardFavorito(cardId) {
    await removerFavorito(cardId);
    console.log("Removendo card favorito:", cardId);

   
    const cardRemovido = document.querySelector(`.container.favorito[data-card-id="${cardId}"]`);
    if (cardRemovido) {
        cardRemovido.remove();
        console.log("Card removido da interface com sucesso");
    } else {
        console.log("Card não encontrado na interface");
    }
}



async function removerFavorito(cardId) {
    console.log("Usuário atual:", currentUser);
    const favoritosCollectionRef = collection(db, 'Favoritos');
    const favoritosDocRef = doc(favoritosCollectionRef, currentUser);


    // Verifica se o documento existe antes de tentar removê-lo
    const favoritosDocSnap = await getDoc(favoritosDocRef);
    if (favoritosDocSnap.exists()) {
        await updateDoc(favoritosDocRef, {
            favoritos: arrayRemove(cardId),
        });

        console.log("Removido dos favoritos com sucesso");
    }
}




