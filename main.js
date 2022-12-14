document.addEventListener('DOMContentLoaded', function(){
    let hitButton = document.getElementById('hitCards')

    let playerField = document.getElementById('playerField')
    let userField = document.getElementById('userField')

    let suits = ["spades", "diamonds", "clubs", "hearts"];
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    startGame()

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

    function startGame() {
        let userCardContainer = document.getElementById('userCardContainer')
        let playerCardContainer = document.getElementById('playerCardContainer')

        let userCards = new Array();
        let oponentCards = new Array();

        let freshDeck = createDeck()
        let deckCards = shuffle(freshDeck)

        deckCards.forEach((card, index) => {
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
                userCardContainer.appendChild(cardElement);
            } else {
                oponentCards.push(card)
                playerCardContainer.appendChild(cardElement);
            }
        });

        hitButton.addEventListener('click', () => {
            let cardsSwaped = hitCards(userCards, oponentCards)

            userCards = cardsSwaped[0]
            oponentCards = cardsSwaped[1]
        })
    
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

    function hitCards(userCards, oponentCards) {
        let userCardData = userCards[0]
        let oponentCardData = oponentCards[0]
        
        console.log(playerField.innerHTML)
        console.log(userField.innerHTML)
        if(playerField.innerHTML != '') {
            playerField.innerHTML = ''
        }

        if(userField.innerHTML != '') {
            userField.innerHTML = ''
        }


        let userCardElement = document.createElement("div");
        userCardElement.classList.add("card");
        userCardElement.innerHTML = userCards[0].CardHTML.innerHTML;
        playerField.appendChild(userCardElement);
        userCardValue1 = gerCardValue(userCardData.Value)

        let playerCardElement = document.createElement("div");
        playerCardElement.classList.add("card");
        playerCardElement.innerHTML = oponentCards[0].CardHTML.innerHTML;
        userField.appendChild(playerCardElement);
        oponentCardValue = gerCardValue(oponentCardData.Value)

        if(userCardValue1 > oponentCardValue) {
            let winCard = oponentCards.shift();
            let asLastCard = userCards.shift()
            console.log("AAAA")

            userCards.push(winCard);
            userCards.push(asLastCard);
        }
        else if(userCardValue1 < oponentCardValue) {
            let winCard = userCards.shift();
            let asLastCard = oponentCards.shift()
            console.log(winCard)

            oponentCards.push(winCard);
            oponentCards.push(asLastCard);
        } else {
            let passCardOne = userCards.shift();
            let passCardTwo = oponentCards.shift()

            userCards.push(passCardOne);
            oponentCards.push(passCardTwo);
        }

        console.log(userCards)
        console.log(oponentCards)

        return [userCards, oponentCards]
    }

    function gerCardValue(cardValue) {
        switch (cardValue) {
            case "A":
                cardValue = 11;
                break;
            case "J":
                cardValue = 12;
                break;
            case "Q":
                cardValue = 13;
                break;
            case "K":
                cardValue = 14;
                break;
        }

        return cardValue
    }
}, false);