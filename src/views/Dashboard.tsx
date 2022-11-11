import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MenuNavbar from "../components/MenuNavbar";
import { getAccountsAsync } from "../store/accountsSlice";
import { getCurrenciesAsync } from "../store/currenciesSlice";
import { getAccountTypesAsync } from "../store/accountTypesSlice";
import Accounts from "../components/Accounts";
import { IAccount } from "../interfaces/account.interface";
import React from "react";

const Dashboard = () => {
  const { accounts, status } = useSelector((state: any) => state.userAccounts);
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
      if (accounts.length === 0) {
        navigate("/create-cash-account");
      }
    }
  }, [status]);

  return (
    <>
      <MenuNavbar />
      <div>Dashboard</div>
      <Accounts
        accounts={accounts}
        account={account}
        siteSelectedCallback={(
          event: React.MouseEvent<HTMLElement, MouseEvent>,
          account: IAccount
        ) => {
          console.log(account);
        }}
      />
    </>
  );
};

export default Dashboard;
