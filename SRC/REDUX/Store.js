import allReducers from "./Reducers"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

var myStore = createStore(allReducers, applyMiddleware(thunk))
export default myStore
