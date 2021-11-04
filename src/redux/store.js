import {applyMiddleware, combineReducers, createStore} from "redux";
import {addressReducer} from "./addressReducer/addressReducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    address: addressReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store