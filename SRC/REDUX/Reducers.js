import { combineReducers } from "redux"

var storeDefaultImages = (initstate = [], action) => {
  switch (action.type) {
    case "DEFAULT":
      return action.payload

    default:
      return initstate
  }
}

var allReducers = combineReducers({
  storeDefaultImages: storeDefaultImages,
})

export default allReducers
