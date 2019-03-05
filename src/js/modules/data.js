export function parseToJson(data) {
  return JSON.parse(data)
}

export function cleanData(searchType) {
  let data = parseToJson(localStorage.getItem(searchType))
   return data.map(singleItem => {
     let dataObj = {
       type : singleItem.formats.format['_text'] ? singleItem.formats.format['_text'] : "no type there",
       author : singleItem.authors && singleItem.authors['main-author'] && singleItem.authors['main-author']._text  ? singleItem.authors['main-author']._text : "no author"
     }
     console.log(dataObj, dataObj.length);
   })
}


export function renderData() {}
