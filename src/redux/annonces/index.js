import { SET_ANNONCES } from './actions';

const initialState = [];

const annonces = (state = initialState, action) => {
    switch(action.type) {
        case SET_ANNONCES:
            return action.annonces;
        default:
            return state;
    }
};

export default annonces;
