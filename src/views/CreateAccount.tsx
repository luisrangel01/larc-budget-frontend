import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createAccountAsync, resetCreateAccount } from "../store/createAccountSlice";
import baseCurrencies from "../assets/currencies.json";
import baseAccountTypes from "../assets/accountTypes.json";
import { ICurrency } from "../interfaces/currency.interface";
import { IAccountType } from "../interfaces/accountType.interface";

import MenuNavbar from "../components/MenuNavbar";
import Currencies from "../components/Currencies";
import AccountTypes from "../components/AccountTypes";
import Color from "../components/Color";

const CreateCashAccount = () => {
  const [color, setColor] = useState("#00D084");
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [types, setTypes] = useState<IAccountType[]>([]);
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
    currentBalance: 0,
    type: "",
    name: "",
    color: color,
    currency: "",
  });
  const { accountId } = useSelector((state: any) => state.createAccount);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const getCurrencies = () => {
    const dataCurrencies: ICurrency[] = baseCurrencies;

    dataCurrencies.sort((a, b) => a.id - b.id);

    setCurrencies((prevNames) => [...dataCurrencies]);
    return dataCurrencies;
  };

  const getAccountTypes = () => {
    const dataAccountTypes: IAccountType[] = baseAccountTypes;

    dataAccountTypes.sort((a, b) => (a.order || 0) - (b.order || 0));

    setTypes((prevNames) => [...dataAccountTypes]);
    return dataAccountTypes;
  };

  useEffect(() => {
    getCurrencies();
    getAccountTypes();
  }, []);

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
      dispatch(resetCreateAccount());
      navigate("/dashboard");
    }
  }, [accountId]);

  const currencyHandleSelect = (e: any) => {
    const currencyFind = currencies.find((currency) => currency.code === e);
    if (currencyFind) {
      setCurrency(currencyFind);
    }
  };

  const typeHandleSelect = (e: any) => {
    const typeFind = types.find((type) => type.id === e);
    if (typeFind) {
      setAccountType(typeFind);
    }
  };

  const handelChange = (e: any) => {
    setDataAccount({ ...dataAccount, [e.target.name]: e.target.value });
  };

  const handleChangeComplete = (color: any) => {
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
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Configure Account</h3>
            <div className="form-group mt-3">
              <label>Account Name</label>
              <input
                type="text"
                name="name"
                onChange={handelChange}
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
                onChange={handelChange}
                value={dataAccount.currentBalance}
                className="form-control mt-1"
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
              <Color color={color} onChangeComplete={handleChangeComplete} />
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

export default CreateCashAccount;
