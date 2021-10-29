import { ADD_INFO, CLEAR_INFO } from "../actions/action.type";

const intitialState = []

function info(state = intitialState, action) {
    const { type, payload } = action
    switch (type) {
        case ADD_INFO:
            return [...state, payload]
        case CLEAR_INFO:
            return []
        default:
            return state;
    }
}
export default info