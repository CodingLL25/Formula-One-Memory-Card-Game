// Variables
const cardContainer = document.querySelector(".cards-area");
const card = document.querySelectorAll(".card");
const controlArea = document.querySelector(".control-area");
const scoresContainer = document.querySelector(".score-and-attempts-area");
const instructions = document.querySelector("instructions");

const cardArray = [
    './assets/images/image1.jpg',
    './assets/images/image2.jpg',
    './assets/images/image3.jpg',
    './assets/images/image4.jpg',
    './assets/images/image5.jpg',
    './assets/images/image6.jpg',
    './assets/images/image7.jpg',
    './assets/images/image8.jpg',
]

console.log(cardArray);

let cardCounts = {};
let matchedCardCount = 0;
let attemptsMade = 0;

// Wait for the DOM to finish loading before running the game
// add event listeners to the start button
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "start") {
                this.classList.add("start-clicked"); //need to prevent clicking
                startGame();
                createRestartButton();
                console.log("Ready to play!");
            }
        });
    }
});

function createRestartButton() {
    const restart = document.createElement("button");
    restart.classList.add("restart-game");
    restart.innerHTML = "Restart game";
    restart.setAttribute("data-type", "restart-game");
    controlArea.appendChild(restart);

    restart.addEventListener("click", () => {
        restart.classList.add("restart-clicked");
        restartGame();
    });
}

// Build the cards for the game / create the game space
function createCard() {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.innerHTML = "?";

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    cardInner.appendChild(cardFront); // Create and append a div within the card-inner
    cardInner.appendChild(cardBack); // Create and append a div within the card-inner

    card.appendChild(cardInner); // Create and append a div within the card, called card-inner
    return card; // creates the card

};

function addImages(card) {
    const cardBack = card.querySelector(".card-back");

    // Pick a random image from the array and add to card
    let imageIndex;

    do {
        imageIndex = Math.floor(Math.random() * cardArray.length);
    } while (cardCounts[imageIndex] >= 2);

    cardCounts[imageIndex] = (cardCounts[imageIndex] || 0) + 1;

    card.setAttribute("data-index", imageIndex) // Set the ID as the image index

    const image = document.createElement("img"); // Add image element
    image.src = cardArray[imageIndex]; // Add the imange index from the card array 
    cardBack.append(image); // Append image src to the back of the card
    return card; // exit the function
};

function renderRestOfBoard() { // scores here not updating but showing correctly in console log
    const scoresArea = document.createElement("p");
    scoresArea.classList.add("matched-cards");
    scoresContainer.appendChild(scoresArea);
    scoresArea.innerHTML = [`Matched cards: ${matchedCardCount} / 8 `];

    const attemptsArea = document.createElement("p");
    attemptsArea.classList.add("attempts-area");
    scoresContainer.appendChild(attemptsArea);
    attemptsArea.innerHTML = [`Attempts made: ${attemptsMade}`];
}

// Start the game
function startGame() {
    for (let i = 0; i < 16; i++) {
        const card = createCard(); // card returned here
        const imageCard = addImages(card);

        card.addEventListener("click", () => {
            card.classList.add("clicked"); // Add "clicked" to any card which has been clicked
            let activeCards = document.querySelectorAll(".clicked");
            checkForMatch(card);
        });

        cardContainer.appendChild(imageCard);
        console.log(imageCard); // Shows the card images to be matched
    };
};


// Check for a match
function checkForMatch() {
    let activeCards = document.querySelectorAll(".clicked");

    if (activeCards.length === 2) { // If two cards have been flipped, prevent further clicks
        document.body.style.pointerEvents = "none";

        let cardOne = activeCards[0].getAttribute("data-index");
        let cardTwo = activeCards[1].getAttribute("data-index");

        if (cardOne === cardTwo) {
            activeCards[0].classList = ["card matched"];
            activeCards[1].classList = ["card matched"];

            matchedCardCount++;
            attemptsMade++;
            console.log(`Matched cards: ${matchedCardCount}`);
            console.log(`Attempts made: ${attemptsMade}`);
            returnCard();
        } else {
            setTimeout(() => {
                returnCard();
            }, 800);

            attemptsMade++;
            console.log(`Attempts made: ${attemptsMade}`);
        }
    };

    if (matchedCardCount === 8) {
        console.log("All cards have been matched!");
        alert("Congratulations - you've matched all the cards in the game!")
    };
};

function returnCard() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => { // for each card where "matched" not selected, resets class to "card"  therefore unflips the card
        if (!card.classList.contains("matched")) {
            card.classList = ["card"];
            console.log("Unflip cards to be matched");
            document.body.style.pointerEvents = "auto";
        }
    });

}

// Restart the game  
function restartGame() { // need to get this to refresh
    attemptsMade = 0; // resets attempts to 0
    matchedCardCount = 0; // resets matched cards to 0
    cardContainer.innerHTML = ""; // removes cards from the game

    console.log("Restarted button has been selected");
    console.log(`Attempts made: ${attemptsMade}`);
    console.log(`Matched cards: ${matchedCardCount}`);
}