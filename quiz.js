const startButton = document.getElementById("startbtn") 
const nextButton = document.getElementById("nextbtn")

const questionerContainerElement = document.getElementById("question-container")

const questionElement = document.getElementById("question") // question id on the html, where the actual question will be displayed
const answerButtonsElement = document.getElementById("answer-buttons") // on the html, 4 answer buttons

let shuffleQuestions, currentQuestionIndex // created two new variables for the question shuffle, both undefined

startButton.addEventListener("click", startGame ) // starting the game, what happens when you click start button, event listener on click then run funtion start game
nextButton.addEventListener("click", () => { // making the next button work, on click, adding 1 to current question index which we set to 0
    currentQuestionIndex++
    setNextQuestion() // displays next question
})

function startGame() { // first functuon, what happens when click start button
console.log("Game started") // so we know it works when you click it
startButton.classList.add("hide") // adding the class hide to the start button so it will be display: none, like in the CSS
shuffleQuestions = quizQuestions.sort(() => Math.random() - .5) // changes order questions come in. takes array of questions and 'sorts' it, this using random shuffle
currentQuestionIndex = 0 // set to zero, because starting on very first question in shuffled questions array
questionerContainerElement.classList.remove("hide") // after hiding start button, this removes hide class from question container and it all appears
setNextQuestion() // makes first question appear
}

function setNextQuestion() { // what happens when click next button
resetState()
showQuestion(shuffleQuestions[currentQuestionIndex]) // created function called show questions, takes current shuffled questions at the current question index
}

function showQuestion(question) {  // created function, takes a question, question object will be the array of questions, including text etc in an array
    questionElement.innerText = question.question // displays question writing/wording - question only, not answers, yet
    question.answers.forEach(answer => { // this works on displaying the answers, do this by looping through the question's answers, get a single answer for each loop
        const button = document.createElement("button") // creating button for each answer
        button.innerText = answer.text // setting inner text to be equal to answer.text
        button.classList.add("btn") // adding button class, so styling remains same
        if (answer.correct) { //if answer is correct, add data attribute on to buttom element of correct, not doing this for incorrect ones
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer) // adding event listener for this button, when you click it, select answer function runs
        answerButtonsElement.appendChild(button) // adding button as answer buttons
    });
}

function resetState() { // resets quiz back to its default state everytime we set a new question
    clearStatusClass(document.body)
    nextButton.classList.add("hide") // hide the next button, because after we click on an answer, show the next button, and then when we show the next question, we want to make sure we hide the next button again
    while (answerButtonsElement.firstChild) { // next, loop through all the children for our answer button elements
        answerButtonsElement.removeChild // these get rid of extra answer buttons/boxes that displayed in addition to set questions
        (answerButtonsElement.firstChild)
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) { // if correct
        element.classList.add("correct")
    } else {
        element.classList.add("incorrect") // if incorrect
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("incorrect")

}

function selectAnswer(e) { // what happen when you select an answer, this takes event in as a parameter 
   const selectedButton = e.target // whatever button is clicked on
   const correct = selectedButton.dataset.correct // want to check it is correct
   setStatusClass(document.body, correct) // set the status class of the body, takes whether it shoud be set to correct or incorrect
   Array.from(answerButtonsElement.children).forEach(button => { // loop through all the other buttons and selected / set the class for them. 
       setStatusClass(button, button.dataset.correct)
   })
   if (shuffleQuestions.length > currentQuestionIndex + 1) { // checks if theres more questions to go through
       nextButton.classList.remove("hide") // if theres more quetsions, show next button
   } else {
       startButton.innerText = "Restart" // if we are on the last question, turn start button into restart button
       startButton.classList.remove("hide")
   }
   }
  
const quizQuestions = [ // set to an array
    {
        question: "What's the highest SPF one really needs for proper sun protection?",
        answers: [

        
        { text: "SPF 10", correct: false },
        { text: "SPF 50", correct: false },
        { text: "SPF 30", correct: true },
        { text: "SPF 25", correct: false }
        ]
        
    },

    {
        question: "What is the benefit of topical Vitamin C?",
        answers: [

        
        { text: "Anti-aging", correct: false },
        { text: "Even skin tone", correct: false },
        { text: "Anti-oxidant", correct: false },
        { text: "All of the above", correct: true }
        ]
        
    },

    {
        question: "Where is the thinnest skin located that people may neglect?",
        answers: [

        
        { text: "Nose", correct: false },
        { text: "Eyelids", correct: true },
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

        { text: "It's an acid", correct: false },
        { text: "It's an oil", correct: false },
        { text: "It's an crystal healing", correct: false },
        { text: "It's a vitamin", correct: true }
        ]
        
    }
]