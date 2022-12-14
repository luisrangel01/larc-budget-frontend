import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import listSlice from "./listSlice";
import authSlice from "./auth/authSlice";
import authSignUpSlice from "./auth/authSignUpSlice";
import accountsSlice from "./accounts/accountsSlice";
import createAccountSlice from "./accounts/createAccountSlice";
import updateAccountSlice from "./accounts/updateAccountSlice";
import deleteAccountSlice from "./accounts/deleteAccountSlice";
import updateStatusAccountSlice from "./accounts/updateStatusAccountSlice";
import createAccountTransactionSlice from "./accountTransactions/createAccountTransactionSlice";
import createTransferSlice from "./accountTransactions/createTransferSlice";
import transactionsSlice from "./accountTransactions/transactionsSlice";
import updateAccountTransactionSlice from "./accountTransactions/updateAccountTransactionSlice";
import currenciesSlice from "./static/currenciesSlice";
import accountTypesSlice from "./static/accountTypesSlice";

const store = configureStore({
  reducer: combineReducers({
    list: listSlice,
    auth: authSlice,
    authSignUp: authSignUpSlice,
    userAccounts: accountsSlice,
    createAccount: createAccountSlice,
    updateAccount: updateAccountSlice,
    deleteAccount: deleteAccountSlice,
    updateStatusAccount: updateStatusAccountSlice,
    createAccountTransaction: createAccountTransactionSlice,
    createTransfer: createTransferSlice,
    transactions: transactionsSlice,
    updateAccountTransaction: updateAccountTransactionSlice,
    currencies: currenciesSlice,
    accountTypes: accountTypesSlice,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
