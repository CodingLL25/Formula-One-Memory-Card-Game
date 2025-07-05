// Variables
const cardContainer = document.getElementById("cards-area");
console.log(cardContainer);

const controlArea = document.getElementById("control-area");
console.log(controlArea);

const scoresContainer = document.getElementById("score-and-attempts-area");
console.log(scoresContainer);

const instructions = document.getElementById("instructions");
console.log(instructions);

const startButton = document.getElementById("start");
console.log(startButton);


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

let cardCounts = [];
let matchedCardCount = 0;
let attemptsMade = 0;
let card = document.querySelectorAll(".card");

// Reference tutorial
// https://www.youtube.com/watch?v=t3cydTwfEnM

// Wait for the DOM to finish loading before running the game
// add event listeners to the start button
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start").addEventListener("click", function () {
        startGame();
    });
});

// Build the cards for the game and render the game (restart button, cards, scores and attempts)
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
    image.src = cardImage; // Add the image index from the card array
    image.alt = cardAlt; // Add the alt description from the card array

    cardBack.append(image); // Append image to the back of the card
    return card; // exit the function
};

function createRestart() {
    const restart = document.createElement("button");
    restart.classList.add("restart-game");
    restart.innerHTML = "Restart game";
    restart.setAttribute("data-type", "restart-game");
    controlArea.appendChild(restart);

    restart.addEventListener("click", () => {
        attemptsMade = 0; // resets attempts to 0
        matchedCardCount = 0; // resets matched cards to 0
        let cardCounts = [];
        cardContainer.innerHTML = ""; // removes cards from the game

        console.log("Restart button has been selected");
        console.log(`Attempts made: ${attemptsMade}`);
        console.log(`Matched cards: ${matchedCardCount}`);
    });
}

// Start the game
function startGame() {
    controlArea.removeChild(startButton);

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

    createRestart();
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

            updateMatchedCards();
            updateAttempts;
            returnCard();
        } else {
            setTimeout(() => {
                returnCard();
            }, 750);
            updateAttempts();
        }
    };

    if (matchedCardCount === 8) {
        console.log("All cards have been matched!");
        setTimeout(() => {
            alert(`Congratulations! You have matched all cards in the game!`)
        }, 300)
    };
};

function updateMatchedCards() {
    let matchedCardCount = parseInt(document.getElementById("matched-cards").innerText);
    document.getElementById("matched-cards").innerText = ++attemptsMade;
    console.log(`Matched cards: ${matchedCardCount}`);
}

function updateAttempts() {
    let attemptsMade = parseInt(document.getElementById("attempts-made").innerText);
    document.getElementById("attempts-made").innerText = ++attemptsMade;
    console.log(`Attempts made: ${attemptsMade}`);
}

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


function restartGame() {
    startGame();
}