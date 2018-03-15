import { SET_TOKEN } from './actions';
import { SET_ERROR } from './actions';
import { RESET_AUTH } from './actions';

const initialState = {
    id: false,
    userEmail: "",
    token: "",
    userName: "",
    isLogged: false,
    isAdmin: false,
    isPro: false,
    error: {
        success: false,
        message: {
            email: false,
            password: false
        }
    },
};

const auth = (state = initialState, action) => {

    switch(action.type) {
        case SET_TOKEN:
            return Object.assign({}, state, {
                id: action.id,
                userEmail: action.userEmail,
                userName:action.userName,
                token: action.token,
                isLogged: action.isLogged,
                isAdmin: action.isAdmin,
                isPro: action.isPro,
                error: action.error
            });
        case RESET_AUTH:
            return Object.assign({}, state, {
                id: action.id,
                userEmail: action.userEmail,
                userName:action.userName,
                token: action.token,
                isLogged: action.isLogged,
                isAdmin: action.isAdmin,
                isPro: action.isPro,
                error: action.error
            });
        default:
            return state;
    }
};

export default auth;
