// Variables
const cardContainer = document.getElementById("cards-area");
const controlArea = document.getElementById("control-area");
const scoresContainer = document.getElementById("score-and-attempts-area");
const instructions = document.getElementById("instructions");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset-board");

const matchedCards = document.getElementById("matched-cards");
const attempts = document.getElementById("attempts-made");

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
        imagePath: 'assets/images/image8.jpg',
        alt: 'Photo of a Mercedes F1 car with smoke coming from the back of the car'
    }
];


let cardCounts = [];
let matchedCardCount = 0;
let attemptsMade = 0;

// Reference tutorial
// https://www.youtube.com/watch?v=t3cydTwfEnM


/**
 * Wait for the DOM to finish loading before running the game
 * add event listeners to start button and instructions
 */
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start").addEventListener("click", function () {
        startGame();
    });
});

startButton.addEventListener("click", () => {
    controlArea.removeChild(startButton);
    resetButton.classList.add("reset-board-shown");
});

instructions.addEventListener("click", () => {
    alert(`Welcome to the Formula One - Flip Card Memory Game! There are eight F1 related images behind this cards, match all 8 to win the game!`);
});

/**
 * Restart game by resetting the card count and attempts made to 0
 * Removing the cards from the cards-area
 * Confirm to site user the game has been restarted
 */
function restartGame() {
    cardCounts = {};
    matchedCardCount = 0;
    matchedCards.innerHTML = `${matchedCardCount}`;

    attemptsMade = 0;
    attempts.innerHTML = `${attemptsMade}`;

    cardContainer.innerHTML = "";
    startGame();
    alert(`Cards have been reshuffled - time to play again!`);
}

resetButton.addEventListener("click", () => {
    restartGame();
});

/**
 * Build the cards for the game and add images to back of the cards
 */
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

}

function addImages(card) {
    const cardBack = card.querySelector(".card-back");

    // Pick a random image from the array and add to card
    let imageIndex;

    do {
        imageIndex = Math.floor(Math.random() * cardArray.length); // main body of the loop
    } while (cardCounts[imageIndex] >= 2); // whilst this condition is met

    cardCounts[imageIndex] = (cardCounts[imageIndex] || 0) + 1;

    card.setAttribute("data-index", imageIndex);

    let cardInformation = cardArray[imageIndex];
    let cardImage = cardInformation.imagePath;

    let cardAlt = cardInformation.alt;


    const image = document.createElement("img"); // Add image element
    image.src = cardImage; // Add the image index from the card array
    image.alt = cardAlt; // Add the alt description from the card array

    cardBack.append(image); // Append image to the back of the card
    return card; // exit the function
}


/**
 * Start the game by creating the cards, appending the images, and adding event listeners to cards
 */
function startGame() {
    for (let i = 0; i < 16; i++) {
        const card = createCard(); // card returned here
        const imageCard = addImages(card);

        card.addEventListener("click", () => {
            card.classList.add("clicked"); // Add "clicked" to any card which has been clicked
            checkForMatch(card);
        });

        cardContainer.appendChild(imageCard);
    }
}


/**
 * Once the game has been started, check the two flipped cards for a match
 */
function checkForMatch() {
    if (matchedCardCount !== 8) {
        let activeCards = document.querySelectorAll(".clicked");

        if (activeCards.length === 2) { // If two cards have been flipped, prevent further clicks
            document.body.style.pointerEvents = "none";

            let cardOne = activeCards[0].getAttribute("data-index");
            let cardTwo = activeCards[1].getAttribute("data-index");

            if (cardOne === cardTwo) {
                activeCards[0].classList = ["card matched"];
                activeCards[1].classList = ["card matched"];

                matchedCardCount = matchedCardCount + 1;
                matchedCards.innerHTML = `${matchedCardCount}`;

                attemptsMade = attemptsMade + 1;
                attempts.innerHTML = `${attemptsMade}`;

                returnCard();

            } else {
                setTimeout(() => {
                    returnCard();
                }, 750);


                attemptsMade = attemptsMade + 1;
                attempts.innerHTML = `${attemptsMade}`;
            }

            return;
        }
    } else {
        ;
        setTimeout(() => {
            alert(`Congratulations! You have matched all cards in the game!`);
        }, 300);
    }

    return;
}


/**
 * Once the card has been checked for a match, return the unmatched cards for clicking.
 * If all 8 cards have been matched, alert the site user
 */
function returnCard() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => { // for each card where "matched" not selected, resets class to "card"  therefore unflips the card
        if (!card.classList.contains("matched")) {
            card.classList = ["card"];
            document.body.style.pointerEvents = "auto";
        }
    });

    if (matchedCardCount === 8) {
        document.body.style.pointerEvents = "auto";
        setTimeout(() => {
            alert(`Congratulations! You have matched all cards in the game!`);
        }, 300);

    }
}