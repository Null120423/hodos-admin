import actionTypes from '../actions/actionTypes';

const initialstate = {
    
}
export const adminReducer = (state = initialstate, action) => {
    switch (action.type) {
        case actionTypes.GET_FOOD_START:
            return {
                ...state,
            }
        default:
            return state
    }
}   