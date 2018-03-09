import { SET_ANNONCES, SET_MY_ANNONCES } from './actions';


const initialState = {
    all: [],
    mine: [],
};

const annonces = (state = initialState, action) => {
    switch(action.type) {
        case SET_ANNONCES:
            return {
                all : action.all,
                mine: state.mine
            };
        case SET_MY_ANNONCES:
            return {
                all : state.all,
                mine: action.mine
            };
        default:
            return state;
    }
};

export default annonces;
