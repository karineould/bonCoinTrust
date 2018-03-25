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

export function getAnnonces(query = false) {
    let search = query ? '?search=' + query : '';
    return dispatch => GET('/annonces' + search)
        .then((annonces) => {
            return dispatch(setAnnonces(annonces))
        }).catch((err) => {
            console.log(err);
        });

}

export function getMyAnnonces() {
    return dispatch => GET('/annonces/me')
        .then((annonces) => {
            return dispatch(setMyAnnonces(annonces))
        }).catch((err) => {
            console.log(err);
        })
}


export function addAnnonce(id, title, url, category, location, price, date, images) {
    let payload = JSON.stringify({
        title: title,
        url: url,
        category: category,
        location: location,
        price: price,
        date: date,
        images: images
    });

    return dispatch => PUT('/annonces/' + id, payload)
        .then((annonce) => {
            return dispatch(getMyAnnonces())
        }).catch((err) => {
            console.log(err);
        })
}

export function deleteAnnonce(id) {

    return dispatch => DELETE('/annonces/' + id)
        .then((annonce) => {
            return dispatch(getMyAnnonces())
        }).catch((err) => {
            console.log(err);
        })
}


// export function getAvis(id) {
//     return dispatch => GET('/avis/annonces/' + id, payload)
//         .then((annonce) => {
//             return dispatch(getMyAnnonces())
//         }).catch((err) => {
//             console.log(err);
//         })
// }
