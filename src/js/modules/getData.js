import { cleanData } from './editData.js';
import { buildQuiz, showAmount, showLoader, removeLoader } from './quiz.js';

const types = document.querySelector(".types");

export function getAllData(searchType) {
  const api = new API({
      key: "1e19898c87464e239192c8bfe422f280"
  });

  showLoader()

  api.createStream("search/" + searchType + "{100}/&dim=Type(" + searchType + ")")
  .then(res => {
    let streamObj = res.promises
    let promiseArr = []
    for (let i= 0; i < streamObj.length; i++) {
      promiseArr.push(streamObj[i])
    }
    return promiseArr
  })
  .then(res => {
    return Promise.all(res)
      .then(res => {
        const allBooksArr = [];
        res.forEach(bookArr => {
          bookArr.forEach(singleBook => {
            allBooksArr.push(singleBook)
          })
        })
        return allBooksArr
      })
  })
  .then(res => {
    return cleanData(res)
  })
  .then(res => {
    localStorage.setItem(searchType, JSON.stringify(res));
    let questionNumber = 2;
    let dataValue = searchType
     buildQuiz(questionNumber, dataValue)
     showAmount(searchType)
     return
  }).catch(function(error) {
    console.log(error);
  })
}
