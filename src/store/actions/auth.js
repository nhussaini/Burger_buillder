import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId:userId
    };
};


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

// export const auth = (email, password) =>{
//     return dispatch =>{
//         dispatch(authStart());
//         const authData = {
//             email: email,
//             password:password,
//             returnSecureToken: true
//         }
//         axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNJEMRYpprSnErhOty4xujVpRbTAxVRmA', authData)
//         .then(response => {
//             console.log(response);
//             dispatch(authSuccess(response.data));
//         })
//         .catch(err =>{
//             console.log(err);
//             dispatch(authFail(err));
//         });
//     };
// };











export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCNJEMRYpprSnErhOty4xujVpRbTAxVRmA';
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCNJEMRYpprSnErhOty4xujVpRbTAxVRmA';
        }
        axios.post(url, authData)
        .then (response=>{
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(err =>{
            console.log(err);
            dispatch(authFail(err));
        });
    };
};