import {addressApi} from "../../api/commonApi";

const addressReducerInitialState = {
    streets: [],
    houses: [],
    apartments: [],
}

const actionsNames = {
    setStreets: 'address/SET-STREETS',
    setHouses: 'address/SET-HOUSES',
    setApartments: 'address/SET-APARTMENTS',
}

export const addressReducer = (state = addressReducerInitialState, action) => {
    switch (action.type){
        case actionsNames.setStreets:
            return {...state, streets: action.payload.streets}
        case actionsNames.setHouses:
            return {...state, houses: action.payload.houses}
        case actionsNames.setApartments:
            return {...state, apartments: action.payload.apartments}
        default:
            return state
    }
}

// ACTIONS
const setStreets = (streets) => ({type: actionsNames.setStreets, payload: {streets}})
const setHouses = (houses) => ({type: actionsNames.setHouses, payload: {houses}})
const setApartments = (apartments) => ({type: actionsNames.setApartments, payload: {apartments}})

// THUNKS
export const getStreets = () => async (dispatch) => {
    try {
        const response = await addressApi.getStreets()
        dispatch(setStreets(response.data))
    } catch (error) {
        throw new Error(error)
    }
}
export const getHouses = (id) => async (dispatch) => {
    try {
        const response = await addressApi.getHouses(id)
        dispatch(setHouses(response.data))
    } catch (error) {
        throw new Error(error)
    }
}
export const getApartments= (id) => async (dispatch) => {
    try {
        const response = await addressApi.getApartments(id)
        console.log(response.data)
        dispatch(setApartments(response.data))
    } catch (error) {
        console.log(error)
        // throw new Error(error)
    }
}