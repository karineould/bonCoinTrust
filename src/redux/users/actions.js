import { GET, POST, PATCH, DELETE } from '../../../src/api/api';
import {PUT} from "../../api/api";
export const SET_USERS = 'SET_USERS';


export const setUsers = (users) => ({
    type : SET_USERS,
    users
});


export function getUsers() {
    return dispatch => GET('/users')
        .then((users) => {
            return dispatch(setUsers(users))
        }).catch((err) => {
            console.log(err);
        })

}

export function putUser(userEmail, password) {
    let payload = JSON.stringify({
        email: userEmail,
        password: password
    });

    return dispatch => PUT('/users/create', payload)
        .then((user) => {
            return dispatch(getUsers())
        }).catch((err) => {
            console.log(err);
        })

}

export function deleteUser(id) {
    return dispatch => DELETE('/users/'+ id)
        .then((user) => {
            return dispatch(getUsers());
        }).catch((err) => {
            console.log(err);
        })

}
