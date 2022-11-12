import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { IAccount } from "../interfaces/account.interface";
import MenuNavbar from "../components/MenuNavbar";
import Accounts from "../components/Accounts";
import { getAccountsAsync } from "../store/accountsSlice";
import { getCurrenciesAsync } from "../store/currenciesSlice";
import { getAccountTypesAsync } from "../store/accountTypesSlice";

import { signOut } from "../store/authSlice";
import { resetAccounts } from "../store/accountsSlice";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { accounts, status, statusCode } = useSelector(
    (state: any) => state.userAccounts
  );
  const [account, setAccount] = React.useState<IAccount>({
    id: "",
    name: "",
    type: "",
    currency: "",
    currentBalance: 0,
    color: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    dispatch(getAccountTypesAsync());
    // @ts-ignore
    dispatch(getCurrenciesAsync());
    // @ts-ignore
    dispatch(getAccountsAsync());
  }, []);

  useEffect(() => {
    if (status === "succeeded") {
      setLoading(false);
      if (accounts.length === 0) {
        navigate("/create-cash-account");
      }
    }
  }, [status]);

  useEffect(() => {
    console.log(`xxx statusCode:`, statusCode);
    if (statusCode === 401) {
      signOutNow();
    }
  }, [statusCode]);

  const signOutNow = () => {
    // @ts-ignore
    dispatch(signOut());
    // @ts-ignore
    dispatch(resetAccounts());
  };

  const onClickCard = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    account: IAccount
  ) => {
    navigate("/account-detail", { state: { account: account } });
  };

  return (
    <>
      <MenuNavbar />
      <div>Dashboard</div>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Accounts
        accounts={accounts}
        account={account}
        siteSelectedCallback={onClickCard}
      />
    </>
  );
};

export default Dashboard;
