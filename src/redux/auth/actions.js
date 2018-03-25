import { GET, POST, PUT, PATCH, DELETE } from '../../../src/api/api';
export const SET_TOKEN = 'SET_TOKEN';
export const RESET_AUTH = 'RESET_AUTH';
export const SET_REGISTER = 'SET_REGISTER';


export const setToken = (id, token, userEmail, userName, isAdmin, isPro, success, message = {email: false, password: false}) => ({

    type : SET_TOKEN,
    id: id,
    token: token,
    userEmail: userEmail,
    userName: userName,
    isAdmin: isAdmin,
    isPro: isPro,
    isLogged: success,
    error: {
        success: success,
        message: message
    }
});

export const setRegister = (user, error = false) => ({

    type : SET_REGISTER,
    user: user,
    error: error
});

export const resetAuth = () => ({
    type : RESET_AUTH,
    id: false,
    token: "",
    userEmail: "",
    userName: "",
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
                return dispatch(setToken(response.id, response.token, userEmail, response.nom, response.isAdmin, response.isPro, response.success))

            } else {
                // console.log(response.message);
                return dispatch(setToken(
                    false,
                    "",
                    payload.email,
                    "",
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

export function register(userName, userEmail, password, isPro) {
    let payload = JSON.stringify({
        nom: userName,
        email: userEmail,
        password: password,
        isPro: isPro

    });

    return dispatch => PUT('/auth/createUser', payload)
        .then((response) => {
            // console.log(response);
            if (response.user) {
                return dispatch(setRegister(response.user, false))

            } else {
                // console.log(response.errors);
                return dispatch(setRegister(
                    false,
                    response.errors
                ))
            }
        }).catch((err) => {
            console.log(err);
        })
}


