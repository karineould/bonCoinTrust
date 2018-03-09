import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import annonces from './annonces';

export default combineReducers({
    auth, users, annonces
});
