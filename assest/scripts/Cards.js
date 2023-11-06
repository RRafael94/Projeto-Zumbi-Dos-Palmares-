
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                encontrarCards(user);
            }
        });


        const db = firebase.firestore();

        //const cards = db.collection('Cards');
        //window.cards = cards;,
    

        function addBio() {
            const novoCard = coletarDadosCard();
            // Adicionar o novo card ao Firestore
            db.collection('Cards')
                .add(novoCard)
                .then(() => {
                    console.log("deu certo")
                    window.location.href = "../html/home.html";
                    
                })
                .catch((error) => {
                    console.error("Erro ao adicinar documento: ", error)
                });


        };


    


        

    //cria objeto form 
    const form = {
        NomePersonalidade: () => document.getElementById('NomePersonalidade'),
        dataNascimento: () => document.getElementById('dataNascimento'),
        descricao: () => document.getElementById('descricao'),
        adicionarlinkimg: () => document.getElementById('adicionarlinkimg'),
    }




        function coletarDadosCard() {
            return {
                NomePersonalidade: form.NomePersonalidade().value,
                data: form.dataNascimento().value,
                descricao: form.descricao().value,
                adicionarlinkimg: form.adicionarlinkimg().value,
                user: {
                    uid: firebase.auth().currentUser.uid
                }
            };
        }





        // buscar cards no banco 
        function encontrarCards() {

            db.collection('Cards')
               // where('user.uid', '==', user.uid)
              //  orderBy('NomePersonalidade', 'desc')
                .get()
                .then(snapshot => {
                    const cards = snapshot.docs.map(doc => doc.data())
            
                    criarCard(cards)

                })
                .catch(erro => {
                    console.log(erro);
                })
        }


    
        function criarCard(cards) {
            var cardsContainer = document.querySelector('.cards-container');
            cards.forEach(cards => {
                // Criação dos elementos HTML para a nova biografia
                var card = document.createElement('div');
                card.className = 'container';



                var imgContainer = document.createElement('div');
                imgContainer.className = 'img-container';

                var img = document.createElement('img');
                img.src = cards.adicionarlinkimg

                var details = document.createElement('div');
                details.className = 'details';

                var h2 = document.createElement('h2');
                h2.textContent = cards.NomePersonalidade;

                var h3 = document.createElement('h3');
                h3.textContent = cards.dataNascimento;

                var p = document.createElement('p');
                p.textContent = cards.descricao;

                var iconesCard = document.createElement('div');
                iconesCard.className = 'container-icon';



                var imgRemover = document.createElement("img");
                imgRemover.src = "../images/imgiconeremover.png"; 
                imgRemover.alt = "Ícone";
                imgRemover.className = "icones";
                imgRemover.setAttribute("onclick", "deletarCard(" + cards.id + ")");




                var imgFavoritar = document.createElement("img");
                imgFavoritar.src = "../images/icons_estrela.png";
                imgFavoritar.alt = "Ícone";
                imgFavoritar.className = "icones";
                imgFavoritar.setAttribute("onclick", "cards.adicionarFavorito(" + cards.id + ")");



                card.appendChild(imgContainer);
                imgContainer.appendChild(img);
                card.appendChild(details); // card é pai de details
                details.appendChild(h2); // details é pai de h2, h3 e p
                details.appendChild(h3);
                details.appendChild(p);
                card.appendChild(iconesCard);
                iconesCard.appendChild(imgRemover);
                iconesCard.appendChild(imgFavoritar);
                cardsContainer.appendChild(card);
            
            });

        }







