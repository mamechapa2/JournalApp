import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { login } from '../actions/auth';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user?.uid) {
                dispatch(login(user.uid, user.displayName)); 
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
            
            setChecking(false);
        })
    }, [dispatch, setChecking, setIsLoggedIn])
    
    if(checking){
        return (
            <h1>Espere...</h1>
        )
    }
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth/*" element={
                        <PublicRoute isLoggedIn={isLoggedIn}>
                            <AuthRouter />
                        </PublicRoute>
                    }
                    />

                    <Route path="/" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <JournalScreen />
                        </PrivateRoute>
                    }
                    />
                    
                    
                    
                    {/* <Route path="*" element={<Navigate replace to="/auth/" />}/> */}
               </Routes>
            </BrowserRouter>
        </>
    )
}
