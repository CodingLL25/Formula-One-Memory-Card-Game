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