import { combineReducers } from "redux"

var storeDefaultImages = (initstate = [], action) => {
  switch (action.type) {
    case "DEFAULT":
      return action.payload
    case "SEARCHRESULT":
      return action.payload
    default:
      return initstate
  }
}

var storeImageInfo = (initstate = {}, action) => {
  switch (action.type) {
    case "INFO":
      return action.payload

    default:
      return initstate
  }
}

var textEdit = (initstate = "", action) => {
  switch (action.type) {
    case "EDIT":
      return action.payload
    default:
      return initstate
  }
}

var allReducers = combineReducers({
  storeDefaultImages: storeDefaultImages,
  storeImageInfo: storeImageInfo,
  textEdit: textEdit,
})

export default allReducers
