//
// Blackjack Application 
// by Arnold Ndiwalana

// card suits
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];

// card values

let values = ['Ace', 'King', 'Queen', 'Jack',
    'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five',
    'Four', 'Three', 'Two'
];

// get input from user (DOM Variables)
let textArea = document.getElementById('txt');
let newGameButton = document.getElementById('new-game-btn');
let hitButton = document.getElementById('hit-btn');
let stayButton = document.getElementById('stay-btn')

// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];


// hide hit and stay button at the start of the game
hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

// add event handler to new game button
newGameButton.addEventListener('click', function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    // stores values from the createDeck function
    deck = createDeck();

    //shuffle function call goes here
    shuffleDeck(deck);

    // deal cards to player and dealer
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    //show the hit and stay buttons after game starts
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';

    showStatus();

});

// get another card
hitButton.addEventListener('click', function () {
    playerCards.push(getNextCard());
    checkForEndOfGame();

    showStatus();


});

// don't take a card

stayButton.addEventListener('click', function () {
    gameOver = true;
    checkForEndOfGame();

    showStatus();

});


// create the deck of playing cards
function createDeck() {

    // clears deck each time the deck is created
    let deck = [];

    // loop through the suits and values and adds them to the deck array
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {

        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            // create card object
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            };

            // Add card object to deck array
            deck.push(card);

        }

    }

    return deck;

};

// shuffle deck of cards
function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);

        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];

        deck[i] = tmp;

    };
};

// function to return string values for card object
function getCardString(card) {
    return card.value + ' of ' + card.suit;
};

// get next card in the deck

function getNextCard() {
    return deck.shift();
}

// show numeric values of cards
function getCardNumericValue(card) {
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

// get the score of player and dealer
function getScore(deck) {
    let score = 0;
    let hasAce = false;

    for (let i = 0; i < deck.length; i++) {
        let card = deck[i];

        score += getCardNumericValue(card);

        if (card.value === 'Ace') {
            hasAce = true;

        }
    }

    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }

    return score;
}

// update the scores of players and dealer
function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

// check end of game
function checkForEndOfGame() {
    updateScores();

    if (gameOver) {
        // let the dealer take cards
        while (dealerScore < playerScore &&
            playerScore <= 21 &&
            dealerScore <= 21) {
            dealerCards.push(getNextCard());

            updateScores();
        }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (playerScore === dealerScore) {
        playerWon = false;
        gameOver = true;
        // more additional logic needed
    } else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        }
    } else {
        playerWon = false;
    }
}

// Display welcome message
function showStatus() {
    if (!gameStarted) {
        textArea.innerText = 'Welcome to Blackjack !';
        return;
    };

    // show dealer card
    let dealerCardString = '';
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n';

    };

    // show player card
    let playerCardString = '';
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';

    };

    updateScores();

    // show results of the cards
    textArea.innerText =
        'Dealer has :\n' +
        dealerCardString +
        '(score : ' + dealerScore + ')\n\n' +

        'Player has : \n ' +
        playerCardString +
        '(score : ' + playerScore + ')\n\n';

    // when game is over

    if (gameOver) {
        if (playerWon) {
            textArea.innerText += 'YOU WIN';
        } else if (playerScore === dealerScore) {
            textArea.innerText += 'IT\'S A TIE PLAY  AGAIN';
        } else {
            textArea.innerText += 'DEALER WINS';
        }

        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';

    }





};