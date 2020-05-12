//saga in its core is kind of a function. kind of a function becuase there is a little twist in it.
// sagas are related to actions
//function* logout(action) {} that star turns this function into a so called generator. generators are 
//next generation JS features which are functions which can be executed incrementally. You can call them
// and they don't run from start to end immediately but you can pause during function execution.for example,
// to wait for asyn code to finish
//put in the end will dispatch a new action.
// In a generator, we should pre-pend each step we execute with the yield key word. and it simply means 
// that this step should be executed and that it will wait for it to finish. For examle, if it were 
//a async action, it would not continue before the step is done.

import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';


function* logout(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put({
        type: actionTypes.Auth_LOGOUT
    })
}