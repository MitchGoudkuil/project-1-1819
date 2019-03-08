import { getAllData } from './modules/getData.js';
import { cleanData } from './modules/editData.js';
import { buildQuiz } from './modules/quiz.js';

const startButton = document.querySelector('.test');
const titleScreen = document.querySelector('.title-screen');

let questionNumber = 0
let value = "1"

startButton.addEventListener("click", function(e) {
  questionNumber = 1

  titleScreen.classList.remove("show")
  buildQuiz(questionNumber, value);
})



// (function getAllBooksLocal() {
//   let data = parseToJson(localStorage.getItem('allBookData'))
//   data.map(res => {
//     cleanData(res)
//   })
// })()
//
// function parseToJson(data) {
//   return JSON.parse(data)
// }
