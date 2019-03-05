import { API } from '../../node_modules/oba-wrapper/js/index.js';
import { getAllData } from './modules/getData.js';
import { cleanData } from './modules/data.js';

const firstButtons = document.querySelectorAll('.question__item');

(function addListeners() {
  firstButtons.forEach(item => {
    let buttonValue = item.dataset.value
    item.addEventListener("click", function() {
      getAllData(buttonValue)
    })
  })
})()






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
