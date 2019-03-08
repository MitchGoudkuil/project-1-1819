import { buildQuiz, showResults } from './quiz.js';

export function parseToJson(data) {
  return JSON.parse(data)
}

export function cleanData(data) {
  // let data = parseToJson(localStorage.getItem(searchType))
    return data.map(singleItem => {
      let dataObj = {
       type : singleItem.formats && singleItem.formats.format && singleItem.formats.format['_text'] ? singleItem.formats.format['_text'] : "no type there",
       author : singleItem.authors && singleItem.authors['main-author'] && singleItem.authors['main-author']._text  ? singleItem.authors['main-author']._text : "no author",
       detailLink : singleItem['detail-page'] && singleItem['detail-page']._text ? singleItem['detail-page']._text : "no link",
       bookImg : singleItem.coverimages && singleItem.coverimages.coverimage[0] && singleItem.coverimages.coverimage[0]._text ? singleItem.coverimages.coverimage[0]._text : "../../img/seamless.jpg",
       bookSummary : singleItem.summaries && singleItem.summaries.summary && singleItem.summaries.summary._text ? singleItem.summaries.summary._text : "no summary available",
       bookYear : singleItem.publication && singleItem.publication.year && singleItem.publication.year._text ? singleItem.publication.year._text : null,
       genre : singleItem.subjects && singleItem.subjects['topical-subject'] && singleItem.subjects['topical-subject']._text ? singleItem.subjects['topical-subject']._text : null,
       title: (singleItem.titles[`short-title`] !== undefined) ? singleItem.titles[`short-title`]._text : 'no title'
     }
     return dataObj
   })
}

export function filterData(data, value) {
  let slicedData = data.slice(0, 50);
  const questionNumber = 3
  const dataCounter = document.querySelector('.counter')
  let dataLength = slicedData.length
  dataCounter.innerHTML = dataLength + " boeken over."
  localStorage.setItem(value, JSON.stringify(slicedData));
  buildQuiz(questionNumber, value)
}

export function filterDataAgain(data) {
  let slicedData = data.slice(0, 14);
  // const dataCounter = document.querySelector('.counter')
  // let dataLength = slicedData.length;
  //   dataCounter.innerHTML = dataLength + " boeken gevonden."
  showResults(slicedData)
}

export function renderData(data) {
  const resultList = document.querySelector('.list-container__list-block');

  data.forEach(book => {
    let resultMarkup = `
    <li class="list-container__list-block__item">
      <a target="_blank" href="${book.detailLink}">
      <img class="small-image" src="${book.bookImg}" alt="">
      </a>
    </li>
    `
    resultList.insertAdjacentHTML('beforeend', resultMarkup)
  })
}
