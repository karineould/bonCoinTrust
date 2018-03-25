import {PUT, GET, POST, PATCH, DELETE } from "../../api/api";
export const SET_AVIS = 'SET_AVIS';

export const setAvis = (avis) => ({
    type : SET_AVIS,
    all : avis
});



export function getAvis(annonce) {
    return dispatch => GET('/avis/annonces/' + annonce)
        .then((avis) => {
            return dispatch(setAvis(avis))
        }).catch((err) => {
            console.log(err);
        });

}

export function getAllAvis() {
    return dispatch => GET('/avis')
        .then((avis) => {
            return dispatch(setAvis(avis))
        }).catch((err) => {
            console.log(err);
        });

}

export function putAvis(id, note, commentaire) {
    let payload = JSON.stringify({
        id: id,
        note: note,
        commentaire: commentaire
    });
    return dispatch => PUT('/avis/createAvis', payload)
        .then((avis) => {
            return dispatch(getAvis())
        }).catch((err) => {
            console.log(err);
        });
}

// export function getAnnonceAvis() {
//     return dispatch => GET('/avis/me')
//         .then((avis) => {
//             return dispatch(setAnnonceAvis(avis))
//         }).catch((err) => {
//             console.log(err);
//         })
// }
//
//
// export function addAvis(id, title, url, category, location, price, date, images) {
//     let payload = JSON.stringify({
//         title: title,
//         url: url,
//         category: category,
//         location: location,
//         price: price,
//         date: date,
//         images: images
//     });
//
//     return dispatch => PUT('/avis/' + id, payload)
//         .then((annonce) => {
//             return dispatch(getMyAvis())
//         }).catch((err) => {
//             console.log(err);
//         })
// }
//
// export function deleteAvis(id) {
//
//     return dispatch => DELETE('/avis/' + id)
//         .then((annonce) => {
//             return dispatch(getMyAvis())
//         }).catch((err) => {
//             console.log(err);
//         })
// }
