import {PUT, GET, POST, PATCH, DELETE } from "../../api/api";
export const SET_ANNONCES = 'SET_ANNONCES';
export const SET_MY_ANNONCES = 'SET_MY_ANNONCES';

export const setAnnonces = (annonces) => ({
    type : SET_ANNONCES,
    all : annonces
});

export const setMyAnnonces = (annonces) => ({
    type : SET_MY_ANNONCES,
    mine : annonces
});

export function getAnnonces() {
    return dispatch => GET('/annonces')
        .then((annonces) => {
            return dispatch(setAnnonces(annonces))
        }).catch((err) => {
            console.log(err);
        })

}

export function getMyAnnonces() {
    return dispatch => GET('/annonces/me')
        .then((annonces) => {
            return dispatch(setMyAnnonces(annonces))
        }).catch((err) => {
            console.log(err);
        })
}


export function addAnnonce(id) {
    return dispatch => PUT('/annonces/' + id)
        .then((annonce) => {
            return dispatch(getMyAnnonces())
        }).catch((err) => {
            console.log(err);
        })
}
