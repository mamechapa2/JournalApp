import {types} from '../types/types';
import { googleAuthProvider } from '../firebase/firebase-config';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2'
import { notesLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    
    return (dispatch) => {
        dispatch(startLoading());
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(finishLoading());
                dispatch(login(user.uid, user.displayName));
        })
        .catch(err => {
            dispatch(finishLoading());
            if(err.message.includes('auth/user-not-found')){
                Swal.fire('Error', 'User not registered or deleted', 'error');
            }else if(err.message.includes('auth/wrong-password')){
                Swal.fire('Error', 'Password not correct', 'error');
            }
            
        })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {

    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async({user}) => {
                await updateProfile(user, {displayName: name})
                dispatch(login(user.uid, user.displayName));
        })
        .catch(err => {
            console.log(err)
            if(err.message.includes('auth/email-already-in-use')){
                Swal.fire('Error', 'Email already in use', 'error');
            }
        })
    }

}

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName));
        })
    }
}

export const login = (uid, displayName) => ({
        type: types.login,
        payload: {
            uid,
            displayName
    }
});

export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth();
        signOut(auth);
        dispatch(notesLogout());
        dispatch(logout());
    }
}

export const logout = () => ({
    type: types.logout
});