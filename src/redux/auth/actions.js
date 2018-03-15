import { GET, POST, PATCH, DELETE } from '../../../src/api/api';
export const SET_TOKEN = 'SET_TOKEN';
export const RESET_AUTH = 'RESET_AUTH';

export const setToken = (id, token, userEmail, isAdmin, isPro, success, message = {email: false, password: false}) => ({
    type : SET_TOKEN,
    id: id,
    token: token,
    userEmail: userEmail,
    isAdmin: isAdmin,
    isPro: isPro,
    isLogged: success,
    error: {
        success: success,
        message: message
    }
});

export const resetAuth = () => ({
    type : RESET_AUTH,
    id: false,
    token: "",
    userEmail: "",
    isAdmin: false,
    isPro: false,
    isLogged: false,
    error: {
        success: false,
        message: {
            email: false,
            password: false
        }
    },
});

export function getToken(userEmail, password) {
    let payload = JSON.stringify({
        email: userEmail,
        password: password
    });

    return dispatch => POST('/auth/authenticate', payload)
        .then((response) => {
            if (response.success) {
                return dispatch(setToken(response.id, response.token, userEmail, response.isAdmin, response.isPro, response.success))
            } else {
                console.log(response.message);
                return dispatch(setToken(
                    false,
                    "",
                    payload.email,
                    false,
                    false,
                    response.success,
                    response.message
                ))
            }
        }).catch((err) => {
            console.log(err);
        })

}
