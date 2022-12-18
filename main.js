document.addEventListener('DOMContentLoaded', function(){
    let hitButton = document.getElementById('hitCards')

    let playerField = document.getElementById('playerField')
    let userField = document.getElementById('userField')

    let userCardContainer = document.getElementById('userCardContainer')
    let oponentCardContainer = document.getElementById('oponentCardContainer')

    let suits = ["spades", "diamonds", "clubs", "hearts"];
    // let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let values = ["A", "10", "J", "Q", "K"];

    let userCards = new Array();
    let oponentCards = new Array();
    let drawCardsForTake = new Array();

    startGame()


    function startGame() {
        let freshDeck = shuffle(createDeck())

        // dealCards(freshDeck);        // Deal all cards
        dealCards(freshDeck.slice(0, 10));  // Deal only first 10 cards

        drawCards()

        let moveCount = 0;

        hitButton.addEventListener('click', ()=> {
            moveCount++;
            hitCards(userCards, oponentCards)

            drawCards()

            if(checkLoseWin()) {
                hitButton.remove();
                drawCards(true)
                return;
            }

            if(moveCount == 5) {
                alert("Shuffling cards!")

                hitButton.classList.add("hide");

                setTimeout(() => {
                    hitButton.classList.remove("hide");
                }, 1000);
                
                shuffle(userCards)
                shuffle(oponentCards)
                moveCount = 0
            }
        })
    }

    function drawCards(clear = false) {
        if(clear) {
            userCardContainer.innerHTML = ''
            oponentCardContainer.innerHTML = ''
            document.getElementById('playField').innerHTML = ''
            return
        }

        userCards.forEach(card => {
            userCardContainer.appendChild(card.CardHTML)
        })

        oponentCards.forEach(card => {
            oponentCardContainer.appendChild(card.CardHTML)
        })
    }

    function hitCards(userCards, oponentCards) {
        let userCardData = userCards.shift();
        let oponentCardData = oponentCards.shift();
        
        if(playerField.innerHTML != '') {
            playerField.innerHTML = ''
        }

        if(userField.innerHTML != '') {
            userField.innerHTML = ''
        }


        createCardElement(userCardData.CardHTML.innerHTML, playerField)
        userCardValue1 = getCardValue(userCardData.Value)

        createCardElement(oponentCardData.CardHTML.innerHTML, userField)
        oponentCardValue = getCardValue(oponentCardData.Value)

        if(userCardValue1 > oponentCardValue) {
            userCards.push(userCardData, oponentCardData);
            if(drawCardsForTake !== []) {
                drawCardsForTake.forEach(card => {
                    userCards.push(card)
                });
                drawCardsForTake = []
            }
        }
        else if(userCardValue1 < oponentCardValue) {
            oponentCards.push(oponentCardData, userCardData);
            if(drawCardsForTake !== []) {
                drawCardsForTake.forEach(card => {
                    oponentCards.push(card)
                });
                drawCardsForTake = []
            }
        }
        else {
            drawCardsForTake.push(oponentCardData, userCardData);
        }

        return [userCards, oponentCards]
    }


    function createCardElement(displayValue, parent) {
        let newCardElement = document.createElement("div");
        newCardElement.classList.add("card");
        newCardElement.innerHTML = displayValue;
        parent.appendChild(newCardElement);
    }

    function getCardValue(cardValue) {
        switch (cardValue) {
            case "J":
                cardValue = 12;
                break;
            case "Q":
                cardValue = 13;
                break;
            case "K":
                cardValue = 14;
                break;
            case "A":
                cardValue = 15;
                break;
            default:
                cardValue = parseInt(cardValue);
                break;
        }

        return cardValue
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    function createDeck() {
        let deck = new Array();

        for (let i = 0; i < suits.length; i++) {
            for (let x = 0; x < values.length; x++) {
                let card = {Value: values[x], Suit: suits[i]};
                deck.push(card);
            }
        }

        return deck;
    }

    function dealCards(cardDeck) {
        cardDeck.forEach((card, index) => {
            let currentCardNumber = index + 1

            let color = 'black'
            switch (card.Suit) {
                case "spades":
                    contnetData = "&#9824;";
                    break;
                case "diamonds":
                    contnetData = "&#9830;";
                    color = 'red';
                    break;
                case "clubs":
                    contnetData = "&#9827;";
                    break;
                case "hearts":
                    contnetData = "&#9829;";
                    color = 'red';
                    break;
            }

            let cardElement = document.createElement("div");
            let value = document.createElement("span");
            let symbol = document.createElement("span");

            cardElement.classList.add("card");
            value.classList.add("value");
            symbol.classList.add(color, "card-symbol");

            value.innerHTML = card.Value;
            symbol.innerHTML = contnetData;
            cardElement.appendChild(value);
            cardElement.appendChild(symbol);

            card.CardHTML = cardElement;

            if(currentCardNumber % 2 == 0) {
                userCards.push(card)
            } else {
                oponentCards.push(card)
            }
        });
    }

    function checkLoseWin() {
        let defaultMsgText = 'Refresh page to play again'
        let gameEnded = false;
        if(userCards.length == 0) {
            msg = "You Loose! " + defaultMsgText
            gameEnded = true;
        }
        else if(oponentCards.length == 0) {
            msg = "You WIN!!! " + defaultMsgText
            gameEnded = true;
        }

        if(gameEnded) {
            alert(msg)
        }
        
        return gameEnded;
    }
}, false);