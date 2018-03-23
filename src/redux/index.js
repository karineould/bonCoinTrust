import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import annonces from './annonces';
import avis from './avis';

export default combineReducers({
    auth, users, annonces, avis
});
