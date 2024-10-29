const questions = [
    {
        question: "Choose the sentence that uses a subjunctive mood correctly:?",
        answers: [
            { text: "If I was taller, I would join the basketball team.", correct: false },
            { text: "If I were taller, I would join the basketball team.", correct: true },
            { text: "If I am taller, I would join the basketball team.", correct: false },
            { text: "If I would be taller, I join the basketball team.", correct: false },
        ]
    },
    {
        question: "Select the correct passive form of the sentence : The committee will review the document tomorrow.?",
        answers: [
            { text: " The document will be reviewed by the committee tomorrow.", correct: true},
            { text: "The document would be reviewed by the committee tomorrow.", correct: false},
            { text: "The document is being reviewed by the committee tomorrow.", correct: false },
            { text: "The document will review by the committee tomorrow.", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "Identify the sentence with correct use of adjectives:?",
        answers: [
            { text: "he wore a beautiful, long, red dress.", correct: false },
            { text: "She wore a long, red, beautiful dress.", correct: false},
            { text: "She wore a red, long, beautiful dress.", correct: false },
            { text: "She wore a red, beautiful, long dress.", correct: true },
        ]

    },
    {
        question: "Which is the largest population country in the world?",
        answers: [
            { text: "chaina", correct: false },
            { text: "India", correct: true },
            { text: "Austrelia", correct: false },
            { text: "Brasil", correct: false },
        ]
    },
    {
        question: "Which is the biggest country in the world?",
        answers: [
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false },
            { text: "Russia", correct: true }, // Corrected from India to Russia
        ]
    },
    {
        question: "Select the sentence with correct capitalization:?",
        answers: [
            { text: "We will visit the Eiffel tower in the spring.", correct: false },
            { text: "We will visit the Eiffel Tower in the Spring.", correct: true }, // Corrected spelling
            { text: "We will visit the eiffel tower in the spring.", correct: false },
            { text: "We will visit the Eiffel Tower in the spring.", correct: false }, // Corrected spelling
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

