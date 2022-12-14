import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { ICurrency } from "../interfaces/currency.interface";
import { IAccountType } from "../interfaces/accountType.interface";
import {
  createAccountAsync,
  resetCreateAccount,
} from "../store/accounts/createAccountSlice";
import { getAccountsAsync } from "../store/accounts/accountsSlice";
import MenuNavbar from "../components/MenuNavbar";
import Currencies from "../components/Currencies";
import AccountTypes from "../components/AccountTypes";
import Color from "../components/Color";

const CreateCashAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [color, setColor] = useState("#00D084");
  const [currency, setCurrency] = React.useState<ICurrency>({
    name: "",
    code: "",
    id: 0,
  });
  const [accountType, setAccountType] = React.useState<IAccountType>({
    id: "",
    name: "",
    order: 0,
    validateAmountAvailableDebit: false,
    validateAmountAvailableTransfer: false,
  });
  const [dataAccount, setDataAccount] = useState({
    currentBalance: 0,
    type: "",
    name: "",
    color: color,
    currency: "",
  });
  const { accountId, status } = useSelector(
    (state: any) => state.createAccount
  );
  const { currencies } = useSelector((state: any) => state.currencies);
  const { types } = useSelector((state: any) => state.accountTypes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  useEffect(() => {
    setDataAccount({ ...dataAccount, currency: currency.code });
  }, [currency]);

  useEffect(() => {
    setDataAccount({ ...dataAccount, type: accountType.id });
  }, [accountType]);

  useEffect(() => {
    setDataAccount({ ...dataAccount, color: color });
  }, [color]);

  useEffect(() => {
    if (accountId.length !== 0) {
      // @ts-ignore
      dispatch(getAccountsAsync());
      // @ts-ignore
      dispatch(resetCreateAccount());
      navigate("/dashboard");
    }
  }, [accountId]);

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

  const handleChange = (e: any) => {
    setDataAccount({ ...dataAccount, [e.target.name]: e.target.value });
  };

  const colorHandleChangeComplete = (color: any) => {
    setColor(color.hex);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // @ts-ignore
    dispatch(createAccountAsync(dataAccount));
  };

  return (
    <>
      <MenuNavbar />

      <div className="Auth-form-container">
        <form className="General-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Configure Account</h3>
            {loading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}

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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCashAccount;
