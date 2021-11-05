import {addressApi} from "../../api/commonApi";

const addressReducerInitialState = {
    streets: [],
    houses: [],
    apartments: [],
    chosenStreet: {
        Id: 0,
        Prefix: {
            Id: 0,
            Name: "",
            ShortName: ""
        },
        Name: "",
        CityId: 0,
        City: "",
        NameWithPrefix: "",
    },
    chosenHouse: {
        Id: 0,
        Name: "",
        Type: {
            Id: 0,
            Text: "",
        }
    },
    chosenApartment: {
        Id: 0,
        Flat: "",
        TypeId: 0,
        TypeName: "",
        Name: ""
    },
    isChosenApartment: false,
}

const actionTypeNames = {
    setStreets: 'address/SET-STREETS',
    setHouses: 'address/SET-HOUSES',
    setApartments: 'address/SET-APARTMENTS',
    setChosenStreet: 'address/SET-CHOSEN-STREET',
    setChosenHouse: 'address/SET-CHOSEN-HOUSE',
    setChosenApartment: 'address/SET-CHOSEN-APARTMENT',
    toggleIsChosenApartment: 'address/TOGGLE-IS-CHOSEN-APARTMENT',
}

export const addressReducer = (state = addressReducerInitialState, action) => {
    switch (action.type){
        case actionTypeNames.setStreets:
            return {...state, streets: action.payload.streets.filter( str => str.cityId === 1)}
        case actionTypeNames.setHouses:
            return {...state, houses: action.payload.houses}
        case actionTypeNames.setApartments:
            return {...state, apartments: action.payload.apartments}
        case actionTypeNames.setChosenStreet:
            return {...state, chosenStreet: action.payload.chosenStreet}
        case actionTypeNames.setChosenHouse:
            return {...state, chosenHouse: action.payload.chosenHouse}
        case actionTypeNames.setChosenApartment:
            return {...state, chosenApartment: action.payload.chosenApartment}
        case actionTypeNames.toggleIsChosenApartment:
            return {...state, isChosenApartment: action.payload.isChosenApartment}
        default:
            return state
    }
}

// ACTIONS
const setStreets = (streets) => ({type: actionTypeNames.setStreets, payload: {streets}})
const setHouses = (houses) => ({type: actionTypeNames.setHouses, payload: {houses}})
const setApartments = (apartments) => ({type: actionTypeNames.setApartments, payload: {apartments}})
const setChosenStreet = (chosenStreet) => ({type: actionTypeNames.setChosenStreet, payload: {chosenStreet}})
const setChosenHouse = (chosenHouse) => ({type: actionTypeNames.setChosenHouse, payload: {chosenHouse}})
export const setChosenApartment = (chosenApartment) => ({type: actionTypeNames.setChosenApartment, payload: {chosenApartment}})
export const toggleIsChosenApartment = (status) => ({type: actionTypeNames.toggleIsChosenApartment, payload: {isChosenApartment: status}})

// THUNKS
export const getStreets = () => async (dispatch) => {
    try {
        const response = await addressApi.getStreets()
        dispatch(setStreets(response.data))
        dispatch(toggleIsChosenApartment(false))
    } catch (error) {
        throw new Error(error)
    }
}
export const getHouses = (id) => async (dispatch, getState) => {
    try {
        dispatch(setChosenStreet(...getState().address.streets.filter( str => str.id === id)))
        dispatch(setChosenHouse({}))
        dispatch(setChosenApartment({}))
        const response = await addressApi.getHouses(id)
        dispatch(setHouses(response.data))
        dispatch(toggleIsChosenApartment(false))
    } catch (error) {
        throw new Error(error)
    }
}
export const getApartments= (id) => async (dispatch, getState) => {
    try {
        dispatch(setChosenHouse(...getState().address.houses.filter( h => h.id === id)))
        dispatch(setChosenApartment({}))
        const response = await addressApi.getApartments(id)
        dispatch(setApartments(response.data))
        dispatch(toggleIsChosenApartment(false))
    } catch (error) {
        throw new Error(error)
    }
}