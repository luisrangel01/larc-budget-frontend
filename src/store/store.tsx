import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';


import listSlice from './listSlice';
import authSlice from './authSlice';
import authSignUpSlice from './authSignUpSlice';
import accountsSlice from './accountsSlice';
import createAccountSlice from './createAccountSlice';
import currenciesSlice from './currenciesSlice';

const store = configureStore({
    reducer: combineReducers({
        list: listSlice,
        auth: authSlice,
        authSignUp: authSignUpSlice,
        userAccounts: accountsSlice,
        createAccount: createAccountSlice,
        currencies: currenciesSlice,
    })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 

export default store