import { ADD_INFO, CLEAR_INFO } from "./action.type";
import { v4 as uuidv4 } from 'uuid'

export const addInfo = (fName, lName, eMail) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: ADD_INFO,
        payload: { id, fName, lName, eMail }
    })
}

export const clearInfo = () => dispatch => {
    dispatch({
        type: CLEAR_INFO,
        payload: []
    })
}