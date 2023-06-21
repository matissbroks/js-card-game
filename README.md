# JS Card game

Little funny card game created on Javascript

### Project setup

1. Clone this repo
2. If you are in VS code and have live server extension Name: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
    - Click `Go Live` on bottom right corner of window
    - If not than just open `index.html` from you file system
3. And you are done

### Project setup with Docker

1. make sure you can run docker containers
2. Clone this repo
3. Build image: `docker build -t web-js-card-game .`
4. Run image in container: `docker run -d -p 80:80 --name js-card-game web-js-card-game`
5. Go to `http://localhost/` and you are done. 

***

### Game rules

- Each player got any amount (best to set number of cards which devide by 2) of cards
- Clicking `Hit` button is making ar turn
- If your card by number is bigger you win oponents card, if smaller than loose
- If cards are equal, they are stored in side stack
    - In next turm who wins it, take all stacked cards, and card from move itself
- Every 5 moves player cards are shuffling
- Player who runs out of cards loose game