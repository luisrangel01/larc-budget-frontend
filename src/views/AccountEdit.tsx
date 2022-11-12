import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { IAccount } from "../interfaces/account.interface";
import { ICurrency } from "../interfaces/currency.interface";
import { IAccountType } from "../interfaces/accountType.interface";
import MenuNavbar from "../components/MenuNavbar";
import Currencies from "../components/Currencies";
import AccountTypes from "../components/AccountTypes";
import Color from "../components/Color";
import React from "react";
import { useSelector } from "react-redux";
import { getCurrency, getType } from "../helpers/utils";

const AccountEdit = () => {
  const { currencies } = useSelector((state: any) => state.currencies);
  const { types } = useSelector((state: any) => state.accountTypes);

  const location = useLocation();
  const account: IAccount = location.state.account;

  const [color, setColor] = useState(account.color || "#00D084");
  const [currency, setCurrency] = React.useState<ICurrency>({
    name: "",
    code: "",
    id: 0,
  });
  const [accountType, setAccountType] = React.useState<IAccountType>({
    id: "",
    name: "",
    order: 0,
  });
  const [dataAccount, setDataAccount] = useState({
    currentBalance: account.currentBalance,
    type: account.type,
    name: account.name,
    color: color,
    currency: account.currency,
  });

  useEffect(() => {
    if (currencies.length > 0) {
      const auxCurrency: ICurrency | undefined = getCurrency(
        account.currency,
        currencies
      );
      if (auxCurrency) {
        setCurrency(auxCurrency);
      }
    }
  }, [currencies]);

  useEffect(() => {
    if (types.length > 0) {
      const auxType: IAccountType | undefined = getType(account.type, types);
      if (auxType) {
        setAccountType(auxType);
      }
    }
  }, [types]);

  const navigate = useNavigate();

  const cancel = () => {
    navigate("/account-detail", { state: { account: account } });
  };

  const handleChange = (e: any) => {
    setDataAccount({ ...dataAccount, [e.target.name]: e.target.value });
  };

  const currencyHandleSelect = (e: any) => {
    const currencyFind = currencies.find(
      (currency: ICurrency) => currency.code === e
    );
    if (currencyFind) {
      setCurrency(currencyFind);
    }
  };

  const typeHandleSelect = (e: any) => {
    const typeFind = types.find((type: IAccountType) => type.id === e);
    if (typeFind) {
      setAccountType(typeFind);
    }
  };

  const colorHandleChangeComplete = (color: any) => {
    setColor(color.hex);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // @ts-ignore
    dispatch(updateAccountAsync(dataAccount));
  };

  return (
    <>
      <MenuNavbar />

      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Account Edit</h3>
            <div className="form-group mt-3">
              <div className="d-flex justify-content-between">
                <Button variant="outline-secondary" onClick={cancel}>
                  Cancel
                </Button>
                <Button variant="outline-primary">Edit</Button>
              </div>
            </div>

            <div className="form-group mt-3">
              <label>Account Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={dataAccount.name}
                className="form-control mt-1"
                placeholder="Enter an Account Name"
              />
            </div>

            <div className="form-group mt-3">
              <label>Current Balance</label>
              <input
                type="number"
                name="currentBalance"
                onChange={handleChange}
                value={dataAccount.currentBalance}
                className="form-control mt-1 text-number"
                placeholder="Enter a Current Balance"
              />
            </div>

            <div className="form-group mt-3">
              <label>Currency</label>
              <Currencies
                currency={currency}
                currencies={currencies}
                handleOnSelect={currencyHandleSelect}
              />
            </div>

            <div className="form-group mt-3">
              <label>Type</label>
              <AccountTypes
                type={accountType}
                types={types}
                handleOnSelect={typeHandleSelect}
              />
            </div>

            <div className="form-group mt-3">
              <label>Color</label>
              <Color
                color={color}
                onChangeComplete={colorHandleChangeComplete}
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountEdit;
