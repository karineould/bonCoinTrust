import { SET_USERS } from './actions';

const initialState = [];

const users = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERS:
            return action.users;
        default:
            return state;
    }
};

export default users;
