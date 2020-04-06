import * as actionTypes from "../actions/actionTypes"
const INITIAL_STATE = {
    token: ""
}

export default (state = INITIAL_STATE, action) => {
    switch( action.type) {
        case actionTypes.AUTH_USER:
            const newState = {...state, token: action.paylaod}
            return newState
        case actionTypes.AUTH_ERROR:
            return action.paylaod
        default:
            return state;
    }
    
}