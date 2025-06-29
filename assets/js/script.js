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

function startGame() {}

function checkForMatch() {}

function restartGame() {}