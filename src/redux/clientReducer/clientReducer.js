import {clientApi} from "../../api/commonApi";
import {setErrorMessage, setSuccessMessage} from "../appReducer/appReducer";

const clientInitialState = {
    id: 0,
    result: '',
    message: '',
    addressId: 0,
    clientId: 0,
}

const actionTypeNames = {
    setClient: 'client/SET-CLIENT',
    setApartmentID: 'clients/SET-APARTMENT-ID',
}

export const clientReducer = (state = clientInitialState, action) => {
    switch (action.type) {
        case actionTypeNames.setApartmentID:
            return {...state, addressId: action.payload.apartmentID}
        case actionTypeNames.setClient:
            return {...state, ...action.payload.data}
        default:
            return state
    }
}

// ACTIONS
const setClient = (data) => ({type: actionTypeNames.setClient, payload: {data}})
export const setApartmentID = (apartmentID) => ({type: actionTypeNames.setApartmentID, payload: {apartmentID}})

// THUNKS
export const createClient = (Id, Name, Phone, Email, BindId) => async dispatch => {
    try {
        const response = await clientApi.createClient({Id, Name, Phone, Email, BindId})
        dispatch(setClient(response.data))
        dispatch(setSuccessMessage(response.data.result))
    } catch (error) {
        dispatch(setErrorMessage(error.message))
    }
}