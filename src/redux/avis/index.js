import { SET_AVIS } from './actions';


const initialState = {
    all: [],
};

const avis = (state = initialState, action) => {
    switch(action.type) {
        case SET_AVIS:
            return {
                all : action.all,
            };
        default:
            return state;
    }
};

export default avis;
