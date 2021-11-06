import {clientApi, clientsApi} from "../../api/commonApi";
import {setChosenApartment, toggleIsChosenApartment} from "../addressReducer/addressReducer";
import {setErrorMessage, setSuccessMessage} from "../appReducer/appReducer";

const clientsInApartmentInitialState = {
    clients: [],
    clientsText: 'Выберите интересующую вас квартиру'
}

const actionTypeNames = {
    setClients: 'clients/SET-CLIENTS',
    changeClientsText: 'clients/CHANGE-CLIENTS-TEXT',
}

export const clientsInApartmentReducer = (state = clientsInApartmentInitialState, action) => {
    switch (action.type) {
        case actionTypeNames.setClients:
            return {...state, clients: action.payload.clients}
        case actionTypeNames.changeClientsText:
            return {...state, clientsText: action.payload.text}
        default:
            return state
    }
}

// ACTIONS
const setClients = (clients) => ({type: actionTypeNames.setClients, payload: {clients}})
const changeClientsText = (text) => ({type: actionTypeNames.changeClientsText, payload: {text}})

// THUNKS
export const getClientsInApartment = (addressID) => async (dispatch, getState) => {
    try {
        dispatch(setChosenApartment(...getState().address.apartments.filter(h => h.id === addressID)))
        const response = await clientsApi.getAllClients(addressID)
        if (response.data.length) {
            dispatch(changeClientsText('Список жильцов'))
        } else {
            dispatch(changeClientsText('По этому адресу никого не найдено'))
        }
        if (!response.data) {
            dispatch(setClients([]))
        } else {
            dispatch(setClients(response.data))
        }
        dispatch(toggleIsChosenApartment(true))
    } catch (error) {
        throw new Error(error)
    }
}
export const removeClient = id => async dispatch => {
    try {
        await clientApi.removeClient(id)
        dispatch(setSuccessMessage('Клиент удален из списка'))
    } catch (error) {
        dispatch(setErrorMessage(error.message))
    }
}