var question = document.querySelector('#question');
var options = Array.from(document.querySelector('.options-text'));
var score = document.querySelector('#score-counter');

var currentQuestions = {};
var correctAnswers = true;
var score = 0;
var questionCounter = 0;
var allQuestions = [];

var questions = [
{
    question: 'What is the keyword used to pop up a message to a user?',
    option1: 'message',
    option2: 'alert',
    option3: 'input',
    option4: 'text',
    answer: 2,
},
{
    question: 'What kind of value can you assign to a variable?',
    option1: 'string',
    option2: 'number',
    option3: 'boolean',
    option4: 'all of the above',
    answer: 4,
},
{
    question: 'What is the semicolon used for?',
    option1: 'To start a statement',
    option2: 'To replace a parenthesis',
    option3: 'to replace a curly bracket',
    option4: 'To end a statement',
    answer: 4,
},
{
    question: 'What is the name of the method that adds elements to the end of an array?',
    option1: 'push',
    option2: 'shift',
    option3: 'pop',
    option4: 'splice',
    answer: 1,
},
{
    question: 'These are examples of comparison operators:',
    option1: '+, -, /, *',
    option2: '%, #, &&, ||',
    option3: '!==, ===, >, >=',
    option4: '>, ?, *, =',
    answer: 3,
},
]

var totalScoredPoints = 100;
var maxNumQuestions = 5;

function startQuiz() {
    score = 0;
    questionCounter = 0;
    allQuestions = [...questions];
    getNewQuestion();
} 

function getNewQuestion () {
    if (allQuestions.length === 0 || questionCounter > maxNumQuestions) {
       localStorage.storage.setItem('mostRecentScore', score) 

       return window.location.assign('/.conclusion.html')
    }

    questionCounter++

    questionsInit = Math.floor(Math.random() * allQuestions.length)
    currentQuestions = allQuestions[questionsInit]
    questions.innerText = currentQuestions.questions

    options.forEach(option => {
        var numberOptions = options.dataset['number']
        option.innerText = currentQuestions['option' + numberOptions]
    })
    allQuestions.splice(questionInit, 1)

    correctAnswers = true
}

options.forEach(option => {
    option.addEventListener('click', e => {
        if (!correctAnswers) return

        correctAnswers = false
        var selectedOption = e.target
        var selectedAnswer = selectedOption.dataset['number']

        let classToApply = selectedAnswer == currentQuestions.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(totalScoredPoints)
        }

        selectedOption.parenElement.classList.add(classToApply)
//Reference for setting up the Timer: https://stackoverflow.com/questions/58964755/subtract-time-from-timer-if-answer-is-wrong-creating-a-quiz-javascript
        function startTimer() {
            console.log('Timer starts')
            var seconds = 59;
            var timer = setInterval(function () {
                document.getElementById('timer-display').innerHTML='00:' + seconds;
                seconds--;
                if (seconds < 0) {
                    clearInterval(timer);
                    alert("Time is up!")
                }
            }, 1000);
        }
        incrementScore = number => {
            score-counter >= number
            score-counter.innerText === score
        }

        startQuiz()


    })
})
