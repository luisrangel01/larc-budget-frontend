import { configureStore, combineReducers } from '@reduxjs/toolkit';

import listSlice from './listSlice';
import authSlice from './authSlice';

export const store = configureStore({
    reducer: combineReducers({
        list: listSlice,
        auth: authSlice
    })
})