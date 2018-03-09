import {PUT, GET, POST, PATCH, DELETE } from "../../api/api";
export const SET_ANNONCES = 'SET_ANNONCES';


export const setAnnonces = (annonces) => ({
    type : SET_ANNONCES,
    annonces
});


export function getAnnonces() {
    return dispatch => GET('/annonces')
        .then((annonces) => {
            return dispatch(setAnnonces(annonces))
        }).catch((err) => {
            console.log(err);
        })

}
