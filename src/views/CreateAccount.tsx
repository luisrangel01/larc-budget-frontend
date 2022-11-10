import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";

import { createAccountAsync } from "../store/createAccountSlice";
import baseCurrencies from "../assets/currencies.json";
import baseAccountTypes from "../assets/accountTypes.json";
import { ICurrency } from "../interfaces/currency.interface";
import { IAccountType } from "../interfaces/accountType.interface";

import MenuNavbar from "../components/MenuNavbar";
import Currencies from "../components/Currencies";
import AccountTypes from "../components/AccountTypes";
import Color from "../components/Color";

const CreateCashAccount = () => {
  const [key, setKey] = useState("home");
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
  const [dataCashAccount, setDataCashAccount] = useState({
    currentBalance: 0,
    type: "CASH",
    name: "CASH",
    color: "BLUE",
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
    setDataCashAccount({ ...dataCashAccount, currency: currency.code });
  }, [currency]);

  // useEffect(() => {
  //   if (accountId.length !== 0) {
  //     navigate("/dashboard");
  //   }
  // }, [accountId]);

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
    setDataCashAccount({ ...dataCashAccount, [e.target.name]: e.target.value });
  };

  const finish = () => {
    console.log(dataCashAccount);
    // @ts-ignore
    // dispatch(getSignIn(dataSignIn));
    dispatch(createAccountAsync(dataCashAccount));
  };

  const handleChangeComplete = (color: any) => {
    console.log(color.hex);
    setColor(color.hex);
    // this.setState({ background: color.hex });
  };

  return (
    <>
      <MenuNavbar />

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k || "home")}
        className="mb-3"
      >
        <Tab eventKey="home" title="">
          <div>Select base currency</div>

          <p>
            Let's start by selecting your base currency. All transactions in
            other currencies will be calculated regards this one.
          </p>
          <Currencies
            currency={currency}
            currencies={currencies}
            handleOnSelect={currencyHandleSelect}
          />
          <AccountTypes
            type={accountType}
            types={types}
            handleOnSelect={typeHandleSelect}
          />
          <Color color={color} onChangeComplete={handleChangeComplete} />
          {currency.id !== 0 && (
            <div className="row justify-content-center mt-3">
              <Card style={{ width: "18rem" }}>
                <div className="row justify-content-center mt-1">
                  <Card.Img
                    variant="top"
                    src={currency.flagUrl}
                    className="card-img-flag"
                  />
                </div>
                <Card.Body>
                  <Card.Title>{currency.name}</Card.Title>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setKey("balance");
                    }}
                  >
                    Next
                  </Button>
                </Card.Body>
              </Card>
            </div>
          )}
        </Tab>
        <Tab eventKey="balance" title="">
          <div>Set up your cash balance</div>

          <p>How much cash do you have in your physical wallet?</p>
          <div className="row justify-content-center mt-3">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <div className="row justify-content-center mt-1"></div>

                <label>Amount</label>

                <Stack gap={2} className="mb-3">
                  <div>
                    {" "}
                    <input
                      type="number"
                      name="currentBalance"
                      onChange={handelChange}
                      value={dataCashAccount.currentBalance}
                      className="form-control mt-1 text-number"
                      placeholder="Enter your cash balance"
                    />
                  </div>
                  <div className="bg-light border">{currency.code}</div>
                </Stack>

                <Button variant="primary" onClick={finish}>
                  Finish
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default CreateCashAccount;
