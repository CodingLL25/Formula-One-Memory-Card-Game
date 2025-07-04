// Variables
const cardContainer = document.querySelector(".cards-area");
const controlArea = document.querySelector(".control-area");
const scoresContainer = document.querySelector(".score-and-attempts-area");
const instructions = document.querySelector(".instructions");
const startButton = document.querySelector(".start");

const cardArray = [{
        imagePath: 'assets/images/image1.jpg',
        alt: 'Photo of a Ferrari F1 car heading down the straight in wet conditions'
    },
    {
        imagePath: 'assets/images/image2.jpg',
        alt: 'Close up photo of an F1 car, rear tyre'
    },
    {
        imagePath: 'assets/images/image3.jpg',
        alt: 'Photo of a McLaran F1 car on the race track'
    },
    {
        imagePath: 'assets/images/image4.jpg',
        alt: 'Photo of the back of two F1 cars, lined up in a straight line'
    },
    {
        imagePath: 'assets/images/image5.jpg',
        alt: 'Photo of a truck offloading a car, at the Monaco grand prix'
    },
    {
        imagePath: 'assets/images/image6.jpg',
        alt: 'Photo of a F1 car at the Azerbaijan grand prix in 2025, with the trophy'
    },
    {
        imagePath: 'assets/images/image7.jpg',
        alt: 'Photo from the grandstands at the Monaco grand prix, with a Ferrari on the track'
    },
    {
        imagePath: './assets/images/image8.jpg',
        alt: 'Photo of a Mercedes F1 car with smoke coming from the back of the car'
    }
]

console.log(cardArray);

let cardCounts = {};
let matchedCardCount = 0;
let attemptsMade = 0;
let card = document.querySelectorAll(".card");

// Reference tutorial
// https://www.youtube.com/watch?v=t3cydTwfEnM

// Wait for the DOM to finish loading before running the game
// add event listeners to the start button
document.addEventListener("DOMContentLoaded", function () {
    startButton.addEventListener("click", function () {
        if (startButton.getAttribute("data-type") === "start") {
            startButton.classList.add("start-clicked");
            startGame();
            console.log("Ready to play!");
        }
    });
});

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
        imageIndex = Math.floor(Math.random() * cardArray.length); // main body of the loop
    } while (cardCounts[imageIndex] >= 2); // whilst this condition is met

    cardCounts[imageIndex] = (cardCounts[imageIndex] || 0) + 1;

    card.setAttribute("data-index", imageIndex) // Set the ID as the image index

    cardInformation = cardArray[imageIndex];
    console.log("Card Information:", cardInformation);
    cardImage = cardInformation.imagePath
    console.log(cardImage);

    cardAlt = cardInformation.alt;
    console.log(cardAlt);


    const image = document.createElement("img"); // Add image element
    image.src = cardImage; // Add the imange index from the card array
    image.alt = cardAlt;

    cardBack.append(image); // Append image src to the back of the card
    return card; // exit the function
};

// Add restart button / rest of board
function createRestartButton() {
    const restart = document.createElement("button");
    restart.classList.add("restart-game");
    restart.innerHTML = "Restart game";
    restart.setAttribute("data-type", "restart-game");
    controlArea.appendChild(restart);

    restart.addEventListener("click", () => {
        attemptsMade = 0; // resets attempts to 0
        matchedCardCount = 0; // resets matched cards to 0
        cardContainer.innerHTML = ""; // removes cards from the game

        controlArea.removeChild(restart);
        let startButton = document.querySelector(".start-clicked");
        startButton.classList.remove("start-clicked");

        console.log("Restart button has been selected");
        console.log(`Attempts made: ${attemptsMade}`);
        console.log(`Matched cards: ${matchedCardCount}`);
    });
}

function renderRestOfBoard() { // scores here not updating but showing correctly in console log
    const scoresArea = document.createElement("p");
    scoresArea.classList.add("matched-cards");
    scoresContainer.appendChild(scoresArea);
    scoresArea.innerHTML = [`Matched cards: ${matchedCardCount} / 8 `]; // BUG - need to make sure scores are incrementing

    const attemptsArea = document.createElement("p");
    attemptsArea.classList.add("attempts-area");
    scoresContainer.appendChild(attemptsArea);
    attemptsArea.innerHTML = [`Attempts made: ${attemptsMade}`]; // BUG - need to make sure scores are incrementing
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

    createRestartButton();
    renderRestOfBoard();
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
            }, 750);

            attemptsMade++;
            console.log(`Attempts made: ${attemptsMade}`);
        }
    };

    if (matchedCardCount === 8) { // BUG - didnt match all 8 and the alert appeared - managed to select a card which had been matched (shows as white) 
        console.log("All cards have been matched!");
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