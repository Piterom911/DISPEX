import {applyMiddleware, combineReducers, createStore} from "redux";
import {addressReducer} from "./addressReducer/addressReducer";
import thunk from "redux-thunk";
import {clientsInApartmentReducer} from "./clientsReducer/clientsReducer";
import {clientReducer} from "./clientReducer/clientReducer";
import {appReducer} from "./appReducer/appReducer";


const rootReducer = combineReducers({
    app: appReducer,
    address: addressReducer,
    client: clientReducer,
    clients: clientsInApartmentReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store