import { getAllData } from './getData.js';
import { parseToJson, filterData, filterDataAgain, renderData } from './editData.js';
import { spin } from './spinner.js'

const loaderScreen = document.querySelector('.loading')

export function json() {
  return  [{
    "id": 1,
    "img": "./src/img/brain.jpg",
    "question": "Waar zit je aan te denken?",
    "tag": "Vraag 1",
    "answers": ['boek', 'video','game' ]
  },
  {
    "id": 2,
    "img": "./src/img/genre.jpg",
    "question": "Welk genre vind je interessant?",
    "tag": "Vraag 2",
    "answers": ['Komedie', 'Drama','Oorlog', 'Jeugd']
  },
  {
    "id": 3,
    "img": "./src/img/seamless.jpg",
    "question": "Waar heb je zin in?",
    "tag": "Vraag 3",
    "answers": ['Guus', 'Dennis', 'Folkert'],
  }]
}

export function buildQuiz(number, value) {
  const questionBlock = document.querySelector('.question-div');
  const answerList = document.querySelector('.answer-list');
  const jsonData = json();

  let changingValue = value


  let currentNumber = number

  jsonData.forEach(question => {
    var questionId = question.id;

    if (questionId === currentNumber) {
      const questionMarkup = `
      <div class="question__image">
        <img src="${question.img}" alt="">
      </div>
      <p class="question__tag">${question.tag}</p>
      <h1 class="question__title">${question.question}</h1>
      `
      questionBlock.innerHTML = questionMarkup

      let allanswers = question.answers.map(answer => {
        return `<li class="answer-list__item" data-value="${answer}">${answer}</li>`
      }).join(' ')
      answerList.innerHTML = allanswers
    }
  })
  if (number === 3){
    addThirdListeners(changingValue);
  } else if (number === 2){
    removeLoader();
    addQuestionListeners(changingValue);
  } else if (number === 1) {
    addFirstListeners();
  } else {
    console.log("FU");
  }
}

export function showLoader(){
  loaderScreen.classList.remove('loader-container__noloader')
}

export function removeLoader(){
  loaderScreen.classList.add('loader-container__noloader')
}

export function addQuestionListeners(value) {
  const answerButtons = document.querySelectorAll('.answer-list__item');

  setTimeout(function(){
    const dataCounter = document.querySelector('.counter')
    dataCounter.classList.remove('counter__noshow')
  }, 500);

  answerButtons.forEach(button => {
    button.addEventListener("click", function() {
      let data = parseToJson(localStorage.getItem(value))
      filterData(data, value)
    })
  })
}

export function addThirdListeners(value) {
  const answerButtons = document.querySelectorAll('.answer-list__item');
  answerButtons.forEach(button => {
    button.addEventListener("click", function() {
      let data = parseToJson(localStorage.getItem('Komedie'))
       filterDataAgain(data)
    })
  })
}

export function addFirstListeners() {
  const answerButtons = document.querySelectorAll('.answer-list__item');
  answerButtons.forEach(button => {
    button.addEventListener("click", function() {
      let buttonValue = button.dataset.value
      getAllData(buttonValue)
    })
  })
}

export function showAmount(searchType) {
  let data = parseToJson(localStorage.getItem(searchType))
  const dataCounter = document.querySelector('.counter')
  const dataLength = data.length
  dataCounter.innerHTML = dataLength + " boeken gevonden."
}

export function showResults(data) {
  const resultScreen = document.querySelector('.result-screen')
  const spinnerScreen = document.querySelector('.wheel-screen')
  const wheelButton = document.querySelector('.result-screen__wheel-button')
  const lastAmount = document.querySelector('.last-amount')
  let dataLength = data.length

  resultScreen.classList.remove('noshow');
  lastAmount.innerHTML = dataLength
  renderData(data)

  wheelButton.addEventListener("click", function(){
    resultScreen.classList.add('noshow');
    spinnerScreen.classList.remove('noshow');
    showSpinner(data);
  })
}

export function showSpinner(data) {
  console.log(data);
  const spinnerButton = document.querySelector('.spin-button')
  spinnerButton.addEventListener("click", function() {
    spin()
  })
}
