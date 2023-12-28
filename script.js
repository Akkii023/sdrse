const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        correctAnswer: "Paris",
        gifts: ["Eiffel Tower Souvenir", "French Perfume", "Parisian Chocolates", "French Fashion Magazine"]
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars",
        gifts: ["Martian Rock", "Telescope", "Mars Exploration Book", "Red Planet Poster"]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare",
        gifts: ["Shakespeare's Complete Works", "Theater Tickets", "Quill and Ink Set", "Romeo and Juliet DVD"]
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Dolphin"],
        correctAnswer: "Blue Whale",
        gifts: ["Whale Watching Tour", "Oceanography Book", "Blue Whale Plush Toy", "Whale Documentary DVD"]
    }
];

let currentQuestionIndex = 0;
let selectedGift = null;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const messageContainer = document.getElementById("message-container");
const giftContainer = document.getElementById("gift-container");

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = `<h2>${currentQuestion.question}</h2>`;

    optionsContainer.innerHTML = currentQuestion.options
        .map((option, index) => `<div class="option" onclick="checkAnswer(${index})">${option}</div>`)
        .join("");
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.options.indexOf(currentQuestion.correctAnswer)) {
        messageContainer.innerHTML = "You guessed it right, baby!";
        selectedGift = currentQuestion.gifts;
        giftContainer.innerHTML = currentQuestion.gifts
            .map((gift, index) => `<div class="option" onclick="selectGift(${index})">${gift}</div>`)
            .join("");
        setTimeout(moveToNextQuestion, 8000);
    } else {
        messageContainer.innerHTML = `Aww, you missed it! The correct answer is ${currentQuestion.correctAnswer}.`;
        giftContainer.innerHTML = currentQuestion.gifts
            .map((gift) => `<div class="option">${gift}</div>`)
            .join("");
        setTimeout(moveToNextQuestion, 8000);
    }
}

function selectGift(index) {
    selectedGift = questions[currentQuestionIndex].gifts[index];
    moveToNextQuestion();
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    messageContainer.innerHTML = "";
    giftContainer.innerHTML = "";

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        displayFinalQuestion();
    }
}

function displayFinalQuestion() {
    const finalQuestionContainer = document.createElement("div");
    finalQuestionContainer.id = "final-question-container";
    finalQuestionContainer.innerHTML = `
        <h2>Will you marry me?</h2>
        <div id="final-options" class="options">
            <div class="final-option" onclick="showResult('Yes')">Yes</div>
            <div id="no-button" class="final-option" onclick="showResult('No')">No</div>
        </div>
    `;
    document.body.appendChild(finalQuestionContainer);

    document.getElementById("no-button").addEventListener("mouseover", moveNoButton);
}

function moveNoButton() {
    const noButton = document.getElementById("no-button");
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

function showResult(answer) {
    const finalQuestionContainer = document.getElementById("final-question-container");
    finalQuestionContainer.style.display = "none";

    const resultPopup = document.createElement("div");
    resultPopup.innerHTML = answer === "Yes"
        ? `Aww, baby, I love you! Send me a screenshot of this page. Here are your gifts: ${selectedGift}`
        : "No gifts for you, baby!";
    resultPopup.style.textAlign = "center";

    document.body.appendChild(resultPopup);
}

// Initial display of the first question
displayQuestion();