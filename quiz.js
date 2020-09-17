const startButton = document.getElementById("startbtn")
const nextButton = document.getElementById("nextbtn")

const questionerContainerElement = document.getElementById("question-container")

const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")

let shuffleQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame )
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
console.log("Game started")
startButton.classList.add("hide")
shuffleQuestions = quizQuestions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionerContainerElement.classList.remove("hide")
setNextQuestion()
}

function setNextQuestion() {
resetState()
showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("incorrect")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("incorrect")

}

function selectAnswer(e) {
   const selectedButton = e.target
   const correct = selectedButton.dataset.correct
   setStatusClass(document.body, correct)
   Array.from(answerButtonsElement.children).forEach(button => {
       setStatusClass(button, button.dataset.correct)
   })
nextButton.classList.remove("hide")

}

const quizQuestions = [
    {
        question: "What's the highest SPF one really needs for proper sun protection?",
        answers: [

        { text: "SPF 30", correct: true },
        { text: "SPF 10", correct: false },
        { text: "SPF 50", correct: false },
        { text: "SPF 25", correct: false }
        ]
        
    },

    {
        question: "What is the benefit of topical Vitamin C?",
        answers: [

        { text: "All of the above", correct: true },
        { text: "Anti-aging", correct: false },
        { text: "Even skin tone", correct: false },
        { text: "Anti-oxidant", correct: false }
        ]
        
    },

    {
        question: "Where is the thinnest skin located that people may neglect?",
        answers: [

        { text: "Eyelids", correct: true },
        { text: "Nose", correct: false },
        { text: "Back of hands", correct: false },
        { text: "Cheeks", correct: false }
        ]
        
    },

    {
        question: "Do pore strips work?",
        answers: [

        { text: "No, over time they actually make pores bigger and more susceptible to blackheads", correct: true },
        { text: "Yes, they pull out gunk from the root", correct: false },
        { text: "No, they leave traces of stuff deep in your pores", correct: false },
        { text: "Yes, it's one of the only ways to fully remove blackheads.", correct: false }
        ]
        
    },

    {
        question: "What is  retinol?",
        answers: [

        { text: "It's a vitamin", correct: true },
        { text: "It's an acid", correct: false },
        { text: "It's an oil", correct: false },
        { text: "It's an crystal healing", correct: false }
        ]
        
    }
]