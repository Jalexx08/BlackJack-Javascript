
//* Usando patron modulo

const myModule = (() => {
    'use strict'

    let deck = [];
    const kinds = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let playersScore = [];

    let playerScore = 0,
        computerScore = 0;

    const animateAlert = {
        showClass: {
            popup: 'animate__animated animate__fadeInDown animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster'
        }
    }
    //* Referencias al HTML

    const btnPull = document.querySelector('#btnPull'),
        btnNew = document.querySelector('#btnNew'),
        btnStop = document.querySelector('#btnStop');

    const divCards = document.querySelectorAll('.divCards');

    const scores = document.querySelectorAll('small');

    //* Función para inciiar juego

    const startGame = (numPlayers = 2) => {

        deck = createDeck();
        playersScore = [];

        for (let i = 0; i < numPlayers; i++) {
            playersScore.push(0);
            scores[i].innerText = 0;
            divCards[i].innerHTML = ''
        }

        btnPull.disabled = false;
        btnStop.disabled = false;

    }

    //* Función para crear un nuevo deck 

    const createDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let kind of kinds) {
                deck.push(i + kind)
            }
        }

        for (let kind of kinds) {
            for (let special of specials) {
                deck.push(special + kind);
            }
        }

        return _.shuffle(deck);
    }


    //* Función para tomar una carta

    const pullCard = () => {
        if (deck.length === 0) throw 'No hay cartas';

        return deck.pop();
    }

    //* Función obtener el valor de la carta

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);

        return (isNaN(value))
            ? (value === 'A') ? 11 : 10
            : value * 1
    }

    //* Función crear carta

    const createCard = (card, turn) => {

        const imgCard = document.createElement('img');
        imgCard.src = `./assets/cards/${card}.png`;
        imgCard.classList.add('game-card');
        imgCard.classList.add('animate__animated');
        imgCard.classList.add('animate__backInRight');
        imgCard.classList.add('animate__faster');
        divCards[turn].append(imgCard);

    }
    //* Función acumular puntos jugadores

    const acumScore = (card, turn) => {

        playersScore[turn] = playersScore[turn] + cardValue(card);
        scores[turn].innerText = playersScore[turn];

        return playersScore[turn];

    }

    //* Función turno de la computadora

    const turnComputer = (minScores) => {

        const turnPC = playersScore.length - 1;

        do {
            const card = pullCard();

            computerScore = acumScore(card, turnPC);

            createCard(card, turnPC);

            if (minScores > 21) break;

        } while ((computerScore <= minScores) && (computerScore < 21));

        isWinner(minScores, computerScore);

    }

    //* Función  para definir ganador-perdedor-empate

    const isWinner = (playerScore, computerScore) => {

        setTimeout(() => {

            const { showClass, hideClass } = animateAlert;

            if ((playerScore <= 21)) {

                if ((computerScore < 21) && (playerScore > computerScore) || computerScore > 21) {
                    Swal.fire({
                        title: 'Has ganado',
                        showClass,
                        hideClass
                    });
                } else if (computerScore === playerScore) {
                    Swal.fire({
                        title: 'Empate',
                        showClass,
                        hideClass
                    });
                } else {
                    Swal.fire({
                        title: 'Has perdido',
                        showClass,
                        hideClass
                    });
                }

            } else {
                Swal.fire({
                    title: 'Has perdido',
                    showClass,
                    hideClass
                });
            }

        }, 500);
    }

    //* Eventos

    //* Halar cartas

    btnPull.addEventListener('click', () => {

        const card = pullCard();

        playerScore = acumScore(card, 0);

        createCard(card, 0);

        if (playerScore > 21) {
            btnPull.disabled = true;
            btnStop.disabled = true;
            turnComputer(playerScore);

        } else if (playerScore === 21) {
            btnPull.disabled = true;
            btnStop.disabled = true;
            turnComputer(playerScore);

        }

    });

    //* Detener cartas

    btnStop.addEventListener('click', () => {
        btnPull.disabled = true;
        btnStop.disabled = true;
        turnComputer(playerScore);
    });

    //* Cargar nuevo juego( Se colocó en el HTML)

    // btnNew.addEventListener('click', () => {

    //     startGame();
    // });

    return {

        newGame: startGame,

    }
})();




