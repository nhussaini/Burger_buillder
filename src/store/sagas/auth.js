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

import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import axios from 'axios';


import * as actions from '../actions/index';


export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime*1000); 
    yield put(action.logout());
    // setTimeout(()=>{
    //     dispatch(logout());
    // },expirationTime *1000);
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCNJEMRYpprSnErhOty4xujVpRbTAxVRmA';
    if(!action.isSignup){
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCNJEMRYpprSnErhOty4xujVpRbTAxVRmA';
    }
    try{
    const response= yield axios.post(url, authData)

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000) 
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    }
    catch(error){
        yield put(actions.authFail(error.response.data.error));
    }
}