const clientsInApartmentInitialState = {
    errorMessage: '',
    successMessage: '',
}

const actionTypeNames = {
    setErrorMessage: 'app/SET-ERROR-MESSAGE',
    setSuccessMessage: 'app/SET-SUCCESS-MESSAGE',
    resetMessages: 'app/RESET-MESSAGES',
}

export const appReducer = (state = clientsInApartmentInitialState, action) => {
    switch (action.type) {
        case actionTypeNames.setErrorMessage:
            return {...state, errorMessage: action.payload.errorMessage, successMessage: ''}
        case actionTypeNames.setSuccessMessage:
            return {...state, successMessage: action.payload.successMessage, errorMessage: ''}
        case actionTypeNames.resetMessages:
            return {...state, successMessage: '', errorMessage: ''}
        default:
            return state
    }
}

// ACTIONS
export const setErrorMessage = (errorMessage) => ({type: actionTypeNames.setErrorMessage, payload: {errorMessage}})
export const setSuccessMessage = (successMessage) => ({type: actionTypeNames.setSuccessMessage, payload: {successMessage}})
export const resetMessages = () => ({type: actionTypeNames.resetMessages})