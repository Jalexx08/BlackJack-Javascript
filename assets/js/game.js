let deck = [];
const kinds = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerScore = 0,
    computerScore = 0;

//* Referencias al HTML

const btnPull = document.querySelector('#btnPull');
const btnNew = document.querySelector('#btnNew');
const btnStop = document.querySelector('#btnStop');

const scores = document.querySelectorAll('small');
const divPlayerCards = document.querySelector('#player-cards');
const divComputerCards = document.querySelector('#computer-cards');


//* Función para crear un nuevo deck 

const createDeck = () => {

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

    deck = _.shuffle(deck);
    console.log(deck);

    return deck;
}

createDeck();

//* Función para tomar una carta

const pullCard = () => {
    if (deck.length === 0) throw 'No hay cartas';

    let card = deck.pop();
    return card;

}

//* Función obtener el valor de la carta

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    return (isNaN(value))
        ? (value === 'A') ? 11 : 10
        : value * 1
}

//* Función turno de la computadora

const turnComputer = (minScores) => {

    do {
        const card = pullCard();
        computerScore = computerScore + cardValue(card);
        scores[1].innerText = computerScore;

        const imgCard = document.createElement('img');
        imgCard.src = `./assets/cards/${card}.png`;
        imgCard.classList.add('game-card');
        divComputerCards.append(imgCard);

        if (minScores > 21) break;

    } while ((computerScore <= minScores) && (computerScore <= 21));

    setTimeout(() => {

        isWinner(minScores, computerScore);

    }, 500);

}

//* Función  para definir ganador-perdedor-empate

const isWinner = (playerScore, computerScore) => {

    if ((playerScore <= 21)) {

        if ((computerScore < 21) && (playerScore > computerScore) || computerScore > 21) {
            alert('Ganastes');
        } else if (computerScore === playerScore) {
            alert(' Empate');
        } else {
            alert('Perdistes')
        }

    } else {
        alert('Perdistes')
    }
}

//* Eventos

//* Halar cartas

btnPull.addEventListener('click', () => {

    const card = pullCard();
    playerScore = playerScore + cardValue(card);
    scores[0].innerText = playerScore;

    const imgCard = document.createElement('img');
    imgCard.src = `./assets/cards/${card}.png`;
    imgCard.classList.add('game-card');
    divPlayerCards.append(imgCard);

    if (playerScore > 21) {
        btnPull.disabled = true;
        btnStop.disabled = true;
        turnComputer(playerScore);
        // isWinner(playerScore, computerScore);

    } else if (playerScore === 21) {
        btnPull.disabled = true;
        btnStop.disabled = true;
        turnComputer(playerScore);
        // isWinner(playerScore, computerScore);

    }

});

//* Detener cartas

btnStop.addEventListener('click', () => {
    btnPull.disabled = true;
    btnStop.disabled = true;
    turnComputer(playerScore);
    // isWinner(playerScore, computerScore);

});

//* Cargar nuevo juego

btnNew.addEventListener('click', () => {
    deck = [];
    createDeck();
    divComputerCards.innerHTML = '';
    divPlayerCards.innerHTML = '';
    playerScore = 0;
    computerScore = 0;
    scores[0].innerText = 0;
    scores[1].innerText = 0;

    btnPull.disabled = false;
    btnStop.disabled = false;
});




