//takeEvery will allow us to listen to certain actions and do something when they occur.
import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga } from './auth';


//how does this generator work?
//whenever we execute this generator(executed in the index.js), we will basically set up a listener to an action, in this case
// it is AUTH_INITIATE_LOGOUT and then execute the logoutSaga. Note that we just pass a reference of 
//the generator that we wanna execute.
export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
}
