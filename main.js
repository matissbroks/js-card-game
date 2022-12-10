document.addEventListener('DOMContentLoaded', function(){ 
    let cardContainer = document.getElementById('cardContainer')

    let suits = ["spades", "diamonds", "clubs", "hearts"];
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    console.log(cardContainer)

    showDeck()

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

    function showDeck() {
        let deckCards = createDeck()

        deckCards.forEach(card => {
            // console.log(card)

            switch (card.Suit) {
                case "spades":
                    contnetData = "&#9824;";
                    break;
                case "diamonds":
                    contnetData = "&#9827;";
                    break;
                case "clubs":
                    contnetData = "&#9829;";
                    break;
                case "hearts":
                    contnetData = "&#9830;";
                    break;
            }

            let cardElement = document.createElement("div");
            let value = document.createElement("span");
            let symbol = document.createElement("span");

            cardElement.className = "card";
            value.className = "value";
            symbol.className = "card-symbol";

            value.innerHTML = card.Value;
            symbol.innerHTML = contnetData;
            cardElement.appendChild(value);
            cardElement.appendChild(symbol);

            // console.log(cardElement)

            document.getElementById('cardContainer').appendChild(cardElement);
        });
    }
}, false);