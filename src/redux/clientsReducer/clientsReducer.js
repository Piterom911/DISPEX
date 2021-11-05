import {clientsApi} from "../../api/commonApi";
import {setChosenApartment, toggleIsChosenApartment} from "../addressReducer/addressReducer";

const clientsInApartmentInitialState = []

const actionTypeNames = {
    setClients: 'clients/SET-CLIENTS',
}

export const clientsInApartmentReducer = (state = clientsInApartmentInitialState, action) => {
    switch (action.type) {
        case actionTypeNames.setClients:
            return [...action.payload.clients]
        default:
            return state
    }
}

// ACTIONS
const setClients = (clients) => ({type: actionTypeNames.setClients, payload: {clients}})

// THUNKS
export const getClientsInApartment = (addressID) => async (dispatch, getState) => {
    try {
        dispatch(setChosenApartment(...getState().address.apartments.filter( h => h.id === addressID)))
        const response = await clientsApi.getAllClients(addressID)
        dispatch(setClients(response.data))
        dispatch(toggleIsChosenApartment(true))
    } catch (error) {
        throw new Error(error)
    }
}