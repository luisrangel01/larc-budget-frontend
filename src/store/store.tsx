import { configureStore, combineReducers } from '@reduxjs/toolkit';


import listSlice from './listSlice';
import authSlice from './authSlice';
import authSignUpSlice from './authSignUpSlice';
import accountsSlice from './accountsSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: combineReducers({
        list: listSlice,
        auth: authSlice,
        authSignUp: authSignUpSlice,
        userAccounts: accountsSlice,
    })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 

export default store