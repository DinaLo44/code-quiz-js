var interval;
var question = document.querySelector('#question');
var score = document.querySelector('#score-counter');
var answersEl = document.getElementById('answers');
var timerDisplay = document.getElementById('timer-display');

var currentQuestions = {};
var correctAnswers = true;
var timeLeft = 60;
var questionCounter = 0;
var allQuestions = [];
var finalScores = JSON.parse(localStorage.getItem('finalScores')) || []
var questions = [
    {
        question: 'What is the keyword used to pop up a message to a user?',
        option: ['message', 'alert', 'input', 'text'],
        answer: 'alert',
    },
    {
        question: 'What kind of value can you assign to a variable?',
        option: ['string', 'number', 'boolean', 'all of the above'],
        answer: 'all of the above',
    },
    {
        question: 'What is the semicolon used for?',
        option: ['To start a statement', 'To replace a parenthesis', 'To replace a curly bracket', 'To end a statement'],
        answer: 'To end a statement',
    },
    {
        question: 'What is the name of the method that adds elements to the end of an array?',
        option: ['push', 'shift', 'pop', 'splice'],
        answer: 'push',
    },
    {
        question: 'These are examples of comparison operators:',
        option: ['+, -, /, *', '%, #, &&, ||', '!==, ===, >, >=', '>, ?, *, ='],
        answer: '!==, ===, >, >=',
    },
]

var totalScoredPoints = 100;
var maxNumQuestions = 5;

function startQuiz() {
    score = 0;
    questionCounter = 0;
    getNewQuestion();
    startTimer()
}

function getNewQuestion() {

    var currentQuestion = questions[questionCounter]
    question.innerText = currentQuestion.question

    var aLabel = ['A', 'B', 'C', 'D']
    answersEl.innerHTML = ''
    for (var i = 0; i < currentQuestion.option.length; i++) {
        var div = document.createElement('div')
        div.classList.add('options-container')
        var pLabel = document.createElement('p')
        pLabel.classList.add('options-prefix')
        pLabel.textContent = aLabel[i]
        pAnswers = document.createElement('p')
        pAnswers.classList.add('options-text')
        pAnswers.textContent = currentQuestion.option[i]
        div.append(pLabel, pAnswers)
        answersEl.append(div)
    }

}

function submitFormHandler(event) {
    var inputEl = document.getElementsByTagName('input')[0]
    console.log(inputEl.value)
    var tempObject = {
        user: inputEl.value,
        score: timeLeft,
    }
    finalScores.push(tempObject)
    localStorage.setItem('finalScores', JSON.stringify(finalScores))
}

function answerHandler(event) {
    if (event.target.matches('button')) {
        submitFormHandler(event)
    }
    if (event.target.matches('p') && event.target.classList.contains('options-text')) {
        var currentQuestion = questions[questionCounter]

        if (currentQuestion.answer === event.target.textContent) {
            console.log('true')
        }
        else {
            console.log('false')
            timeLeft = timeLeft - 10
        }

        questionCounter++
        
        //If else for either ending the game or bringing new question
        if (questionCounter === questions.length) {
            endQuiz();
        } else {
            getNewQuestion()
        }

    }
}

function endQuiz() {
    clearInterval(interval)
    answersEl.innerHTML = ''
    question.textContent = 'Please submit your initials'
    creatingInitials()
}

function creatingInitials() {
    var inputEl = document.createElement('input')
    inputEl.setAttribute('type', 'text')
    var submitBtn = document.createElement('button')
    submitBtn.textContent = 'Submit'
    submitBtn.setAttribute('id', 'intialsBtn')
    answersEl.append(inputEl, submitBtn)
}

function startTimer() {
    interval = setInterval(function () {
        timeLeft--
        timerDisplay.textContent = timeLeft
        if (timeLeft <= 0) {
            endQuiz()
        }
    }, 1000)
}

answersEl.addEventListener('click', answerHandler)
startQuiz()